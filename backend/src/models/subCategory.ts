import { PoolClient } from 'pg';
import database from '../database';

type SubCategoryType = {
  id: number;
  name: string;
  slug: string;
  category_id: number;
};

class SubCategory {
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
  async createSubCategory(c: SubCategoryType): Promise<SubCategoryType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'INSERT INTO sub_categories (name, slug, category_id) VALUES ($1, $2, $3) RETURNING *',
        values: [c.name, c.category_id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async getSubCategories(id: string): Promise<SubCategoryType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT * FROM sub_categories WHERE category_id=$1',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows;
    });
  }
  async updateSubCategory(
    id: string,
    c: SubCategoryType
  ): Promise<SubCategoryType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'UPDATE sub_categories SET name=$2, slug=$3 WHERE id=$1 RETURNING *',
        values: [id, c.name, c.slug]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async deleteSubCategory(id: string): Promise<SubCategoryType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'DELETE FROM sub_categories WHERE id=$1 RETURNING id',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default SubCategory;
