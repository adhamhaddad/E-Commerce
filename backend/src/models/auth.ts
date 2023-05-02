import { PoolClient } from 'pg';
import { pgClient } from '../database';
import { hash as hashPass, compare } from '../utils/password';
import { UserType } from './user';

type AuthType = {
  email: string;
  password: string;
  role: string;
};

export type PasswordType = {
  old_password: string;
  new_password: string;
};

class Auth {
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
  async authUser(u: AuthType): Promise<UserType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT DISTINCT p.password FROM passwords p, emails e WHERE p.user_id=e.user_id AND e.email=$1',
        values: [u.email]
      };
      const result = await connection.query(query);
      if (result.rows.length) {
        const { password: hash } = result.rows[0];
        const check = await compare(u.password, hash);
        if (check) {
          const { id } = result.rows[0];
          const query = {
            text: 'SELECT id, first_name, last_name FROM users WHERE id=$1',
            values: [id]
          };
          const userResult = await connection.query(query);
          return userResult.rows[0];
        }
        throw new Error('Password is incorrect.');
      }
      throw new Error(`Email not found!`);
    });
  }
  async authMe(id: string): Promise<UserType & AuthType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT id, first_name, last_name FROM users WHERE id=$1',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async updatePassword(id: string, p: PasswordType): Promise<UserType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT password FROM passwords WHERE user_id=$1',
        values: [id]
      };
      const result = await connection.query(query);
      if (result.rows.length) {
        const { password: hash } = result.rows[0];
        const check = await compare(p.old_password, hash);
        if (check) {
          const password = await hashPass(p.new_password);
          const query = {
            text: 'UPDATE passwords SET password=$2 WHERE user_id=$1',
            values: [id, password]
          };
          const result = await connection.query(query);
          return result.rows[0];
        }
        throw new Error('Old password is incorrect.');
      }
      throw new Error("User id doesn't exists.");
    });
  }
}
export default Auth;
