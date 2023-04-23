import { PoolClient } from 'pg';
import database from '../database';

type TagType = {
  id: number;
  name: string;
  product_id: number;
};

class Tag {
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
  async createTag(t: TagType): Promise<TagType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'INSERT INTO tags (name, product_id) VALUES ($1, $2) RETURNING *',
        values: [t.name, t.product_id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async getTags(id: string): Promise<TagType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT * FROM tags WHERE sub_category_id=$1',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows;
    });
  }
  async updateTag(id: string, t: TagType): Promise<TagType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'UPDATE tags SET name=$2 WHERE id=$1 RETURNING *',
        values: [id, t.name]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async deleteTag(id: string): Promise<TagType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'DELETE FROM tags WHERE id=$1 RETURNING id',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default Tag;
