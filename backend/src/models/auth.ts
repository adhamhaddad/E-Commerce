import database from '../database';
import { compare } from '../utils/password';
import { UserType } from './user';

type AuthType = {
  email: string;
  password: string;
  role: string;
};

class Auth {
  async authUser(u: AuthType): Promise<UserType & AuthType> {
    const connection = await database.connect();
    try {
      const sql = `SELECT DISTINCT p.password FROM passwords p, emails e WHERE p.user_id=e.user_id AND e.email=$1`;
      const result = await connection.query(sql, [u.email]);
      if (result.rows.length) {
        const { password: hash } = result.rows[0];
        const check = await compare(u.password, hash);
        if (check) {
          const { id } = result.rows[0];
          const userSQL = 'SELECT * FROM users WHERE id=$1';
          const userResult = await connection.query(userSQL, [id]);
          return userResult.rows[0];
        } else {
          throw new Error('Password is incorrect.');
        }
      }
      throw new Error(`User email not found!`);
    } catch (err) {
      throw new Error((err as Error).message);
    } finally {
      connection.release();
    }
  }
}
export default Auth;
