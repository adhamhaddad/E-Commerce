import { PoolClient } from 'pg';
import { pgClient } from '../database';
import Icon, { IconType } from './icons';

type CategoryType = {
  id: number;
  name: string;
  slug: string;
  icon_id: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

const icon = new Icon();
class Category {
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
  async createCategory(c: CategoryType & IconType): Promise<CategoryType> {
    return this.withConnection(async (connection: PoolClient) => {
      const { id: icon_id } = await icon
        .createIcon(connection, c)
        .then((result) => result);

      const query = {
        text: 'INSERT INTO categories (name, slug, icon_id, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [c.name, c.slug, icon_id, c.user_id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async getCategories(user_id: string): Promise<CategoryType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT * FROM categories WHERE user_id=$1',
        values: [user_id]
      };
      const result = await connection.query(query);
      return result.rows;
    });
  }
  async getCategory(id: string): Promise<CategoryType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT * FROM categories WHERE id=$1',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async updateCategory(
    id: string,
    c: CategoryType & IconType
  ): Promise<CategoryType> {
    return this.withConnection(async (connection: PoolClient) => {
      const { id: icon_id } = await icon
        .createIcon(connection, c)
        .then((result) => result);

      const query = {
        text: 'UPDATE categories SET name=$2, slug=$3, icon_id=$4 WHERE id=$1 RETURNING *',
        values: [id, c.name, c.slug, icon_id]
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
