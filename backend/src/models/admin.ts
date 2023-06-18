import { PoolClient } from 'pg';
import { pgClient } from '../database';
import { UserType, UserTypes, UserRole } from './user';
import Password from './password';

class Admin {
  async withConnection<T>(
    callback: (connection: PoolClient) => Promise<T>
  ): Promise<T> {
    const connection = await pgClient.connect();
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
  async createAdmin(u: UserTypes): Promise<UserType> {
    return this.withConnection(async (connection: PoolClient) => {
      return this.withTransaction(connection, async () => {
        console.log(u);
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
        await password.createPassword(connection, {
          password: u.password,
          user_id: user_id
        });
        return result.rows[0];
      });
    });
  }
  async getAdmins(): Promise<UserType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: `
        SELECT DISTINCT u.id, u.first_name, u.last_name, u.role, e.email
        FROM users u, emails e
        WHERE u.id=e.user_id AND u.role = $1 OR u.id=e.user_id AND u.role = $2
        `,
        values: ['SUPER_ADMIN', 'STORE_OWNER']
      };
      const result = await connection.query(query);
      return result.rows;
    });
  }
  async deleteAdmin(id: string): Promise<UserType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: "UPDATE users SET role='CUSTOMER' WHERE id=$1 RETURNING id",
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default Admin;
