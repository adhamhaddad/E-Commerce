import { PoolClient } from 'pg';
import database from '../database';
import { EmailType } from './email';
import Password, { PasswordType } from './password';

export enum UserRole {
  TENANT = 1,
  CLIENT = 0
}
export type UserType = {
  id?: number;
  first_name: string;
  last_name: string;
  role: UserRole;
  joined?: Date;
};

export type UserTypes = UserType & PasswordType & EmailType;
class User {
  async withConnection<T>(
    callback: (connection: PoolClient) => Promise<T>
  ): Promise<T> {
    const connection = await database.connect();
    try {
      return await callback(connection);
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async withTransaction<T>(
    connection: PoolClient,
    callback: () => Promise<T>
  ): Promise<T> {
    try {
      await connection.query('BEGIN');
      const result = await callback();
      await connection.query('COMMIT');
      return result;
    } catch (error) {
      await connection.query('ROLLBACK');
      throw error;
    }
  }
  async createUser(u: UserTypes): Promise<UserType> {
    return this.withConnection(async (connection: PoolClient) => {
      return this.withTransaction(connection, async () => {
        const password = new Password();

        const query = {
          text: 'INSERT INTO users (first_name, last_name, role) VALUES ($1, $2, $3) RETURNING *',
          values: [u.first_name, u.last_name, u.role]
        };
        const result = await connection.query(query);
        const { id: user_id } = result.rows[0];
        // Email Query
        const emailQuery = {
          text: 'INSERT INTO emails (email, user_id) VALUES ($1, $2)',
          values: [u.email, user_id]
        };
        await connection.query(emailQuery);
        await password.createPassword(connection, u);
        return result.rows[0];
      });
    });
  }
  async getUser(id: string): Promise<UserType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = { text: 'SELECT * FROM users WHERE id=$1', values: [id] };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async updateUser(id: string, u: UserType): Promise<UserType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'UPDATE users SET first_name=$2, last_name=$3 WHERE id=$1 RETURNING *',
        values: [id, u.first_name, u.last_name]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }

  async deleteUser(id: string): Promise<UserType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'DELETE FROM Users WHERE id=$1 RETURNING id',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default User;
