import { PoolClient } from 'pg';
import database from '../database';

export type EmailType = {
  id: number;
  email: string;
  is_default: boolean;
  is_verified: boolean;
  user_id: number;
};

class Email {
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
  async createEmail(e: EmailType): Promise<EmailType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'INSERT INTO emails (email, user_id) VALUES ($1, $2) RETURNING *',
        values: [e.email, e.user_id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async getEmails(id: string): Promise<EmailType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT * FROM emails WHERE user_id=$1',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows;
    });
  }
  async updateEmail(id: string, e: EmailType): Promise<EmailType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'UPDATE emails SET email=$2, is_default=FALSE, is_verified=FALSE WHERE id=$1 RETURNING *',
        values: [id, e.email]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async deleteEmail(id: string): Promise<EmailType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'DELETE FROM emails WHERE id=$1 RETURNING id',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default Email;
