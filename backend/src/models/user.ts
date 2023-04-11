import database from '../database';
import { hash } from '../utils/password';
import { EmailType } from './email';
import { PasswordType } from './password';

enum UserRole {
  'TENANT',
  'CLIENT'
}
export type UserType = {
  id: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  joined: Date;
};

type UserTypes = UserType & PasswordType & EmailType;
class User {
  async createUser(u: UserTypes): Promise<UserType> {
    const connection = await database.connect();
    try {
      // User Query
      database.query('BEGIN');
      const userSQL = `INSERT INTO users (first_name, last_name, role) VALUES ($1, $2, $3) RETURNING *`;
      const result = await connection.query(userSQL, [
        u.first_name,
        u.last_name,
        u.role
      ]);
      const { id } = result.rows[0];
      // Email Query
      const emailSQL = 'INSERT INTO emails (email, user_id) VALUES ($1, $2)';
      await connection.query(emailSQL, [u.email, id]);
      // Password Query
      const passwordSQL = 'INSERT INTO passwords () VALUES ()';
      const password = await hash(u.password);
      await connection.query(passwordSQL, [password, id]);
      database.query('COMMIT');
      return result.rows[0];
    } catch (err) {
      database.query('ROLLBACK');
      throw new Error((err as Error).message);
    } finally {
      connection.release();
    }
  }

  async getUser(id: string): Promise<UserType> {
    const connection = await database.connect();
    try {
      const sql = `SELECT * FROM Users WHERE id=$1`;
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error((err as Error).message);
    } finally {
      connection.release();
    }
  }

  async updateUser(id: string, u: UserType): Promise<UserType> {
    const connection = await database.connect();
    try {
      const sql = `UPDATE Users SET first_name=$2, last_name=$3 WHERE id=$1 RETURNING *`;
      const result = await connection.query(sql, [
        id,
        u.first_name,
        u.last_name
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error((err as Error).message);
    } finally {
      connection.release();
    }
  }

  async deleteUser(id: string): Promise<UserType> {
    const connection = await database.connect();
    try {
      const sql = 'DELETE FROM Users WHERE id=$1 RETURNING id';
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error((err as Error).message);
    } finally {
      connection.release();
    }
  }
}
export default User;
