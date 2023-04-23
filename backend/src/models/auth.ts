import { PoolClient } from 'pg';
import database from '../database';
import { compare } from '../utils/password';
import { UserType } from './user';

type AuthType = {
  email: string;
  password: string;
  role: string;
};

class Auth {
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
  async authUser(u: AuthType): Promise<UserType & AuthType> {
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
            text: 'SELECT * FROM users WHERE id=$1',
            values: [id]
          };
          const userResult = await connection.query(query);
          return userResult.rows[0];
        } else {
          throw new Error('Password is incorrect.');
        }
      }
      throw new Error(`Email not found!`);
    });
  }
  async authMe(id: string): Promise<UserType & AuthType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT DISTINCT u.*, e.email FROM users u, emails e WHERE u.id=$1 AND e.user_id=$1',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default Auth;
