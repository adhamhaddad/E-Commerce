import { PoolClient } from 'pg';
import database from '../database';

type IconType = {
  id?: string;
  icon_url: string;
  category_id: number;
};

class Icon {
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
  async createIcon(i: IconType): Promise<IconType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'INSERT INTO icons (icon_url, category_id) VALUES ($1, $2) RETURNING *',
        values: [i.icon_url, i.category_id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
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
