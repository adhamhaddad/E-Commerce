import { PoolClient } from 'pg';
import database from '../database';

type CategoryType = {
  id: number;
  name: string;
  slug: string;
  user_id: number;
};

class Category {
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
  async createCategory(c: CategoryType): Promise<CategoryType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'INSERT INTO categories (name, slug, user_id) VALUES ($1, $2, $3) RETURNING *',
        values: [c.name, c.slug, c.user_id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async getCategories(id: string): Promise<CategoryType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT * FROM categories WHERE user_id=$1',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows;
    });
  }
  async updateCategory(id: string, c: CategoryType): Promise<CategoryType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'UPDATE categories SET name=$2, slug=$3 WHERE id=$1 RETURNING *',
        values: [id, c.name, c.slug]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async deleteCategory(id: string): Promise<CategoryType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'DELETE FROM categories WHERE id=$1 RETURNING id',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default Category;
