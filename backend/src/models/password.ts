import { PoolClient } from 'pg';
import database from '../database';
import { hash, compare } from '../utils/password';

export type PasswordType = {
  id?: number;
  password: string;
  user_id: number;
};
type ResetPassword = {
  old_password: string;
  new_password: string;
};

type PasswordTypes = PasswordType & ResetPassword;
class Password {
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
  async createPassword(connection: PoolClient, p: PasswordType) {
    const password = await hash(p.password);
    const query = {
      text: 'INSERT INTO passwords (password, user_id) VALUES ($1, $2) RETURNING id',
      values: [password, p.user_id]
    };
    const result = await connection.query(query);
    return result.rows[0];
  }
  async updatePassword(id: string, p: PasswordTypes): Promise<PasswordType> {
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
          const password = await hash(p.new_password);
          const query = {
            text: 'UPDATE passwords SET password=$2 WHERE user_id=$1 RETURNING id',
            values: [id, password]
          };
          const result = await connection.query(query);
          return result.rows[0];
        } else {
          throw new Error('Password is incorrect.');
        }
      }
      throw new Error("Email doesn't exists");
    });
  }
}
export default Password;
