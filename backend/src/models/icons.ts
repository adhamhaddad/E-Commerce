import { PoolClient } from 'pg';
import { pgClient } from '../database';

export type IconType = {
  id?: string;
  icon_url: string;
};

class Icon {
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
  async createIcon(connection: PoolClient, i: IconType): Promise<IconType> {
    const query = {
      text: 'INSERT INTO icons (icon_url) VALUES ($1) RETURNING id',
      values: [i.icon_url]
    };
    const result = await connection.query(query);
    return result.rows[0];
  }
  async updateIcon(id: string, i: IconType): Promise<IconType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'UPDATE icons SET icon_url=$2 WHERE id=$1 RETURNING *',
        values: [i.icon_url, id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async deleteIcon(id: string): Promise<IconType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'DELETE FROM icons WHERE id=$1 RETURNING id',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default Icon;
