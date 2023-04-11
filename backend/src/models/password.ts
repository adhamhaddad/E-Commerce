import database from '../database';
import { hash, compare } from '../utils/password';

export type PasswordType = {
  id: string;
  password: string;
  user_id: string;
};
type ResetPassword = {
  old_password: string;
  new_password: string;
};

type PasswordTypes = PasswordType & ResetPassword;
class Password {
  async updatePassword(id: string, p: PasswordTypes): Promise<PasswordType> {
    const connection = await database.connect();
    try {
      const sql = 'SELECT password FROM passwords WHERE user_id=$1';
      const result = await connection.query(sql, [id]);
      const { password: hash } = result.rows[0];
      const check = await compare(p.old_password, hash);
      if (check) {
        const sql = `UPDATE passwords SET password=$2 WHERE user_id=$1 RETURNING id`;
        const password = await hash(p.new_password);
        const result = await connection.query(sql, [id, password]);
        return result.rows[0];
      } else {
        throw new Error("Password did'nt match.");
      }
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
}
export default Password;
