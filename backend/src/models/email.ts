import database from '../database';

export type EmailType = {
  id: string;
  email: string;
  is_default: boolean;
  is_verified: boolean;
  user_id: string;
};

class Email {
  async createEmail(e: EmailType): Promise<EmailType> {
    const connection = await database.connect();
    try {
      const sql = `INSERT INTO emails (email, user_id) VALUES ($1, $2) RETURNING *`;
      const result = await connection.query(sql, [e.email, e.user_id]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async getEmails(id: string): Promise<EmailType[]> {
    const connection = await database.connect();
    try {
      const sql = `SELECT * FROM emails WHERE user_id=$1`;
      const result = await connection.query(sql, [id]);
      return result.rows;
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async updateEmail(id: string, e: EmailType): Promise<EmailType> {
    const connection = await database.connect();
    try {
      const sql = `UPDATE emails SET email=$1, is_default=FALSE, is_verified=FALSE WHERE id=$1 RETURNING *`;
      const result = await connection.query(sql, [id, e.email]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async deleteEmail(id: string): Promise<EmailType> {
    const connection = await database.connect();
    try {
      const sql = `DELETE FROM emails WHERE id=$1 RETURNING id`;
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
}
export default Email;
