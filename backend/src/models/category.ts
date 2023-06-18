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
  async withTransaction<T>(
    connection: PoolClient,
    callback: () => Promise<T>
  ): Promise<T> {
    try {
      connection.query('BEGIN');
      const result = await callback();
      connection.query('COMMIT');
      return result;
    } catch (error) {
      connection.query('ROLLBACK');
      throw error;
    }
  }
  async createCategory(c: CategoryType & IconType): Promise<CategoryType> {
    return this.withConnection(async (connection: PoolClient) => {
      return this.withTransaction(connection, async () => {
        const { id: icon_id } = await icon.createIcon(connection, c);
        const query = {
          text: `
          INSERT INTO categories (name, slug, icon_id, user_id)
          VALUES ($1, $2, $3, $4)
          RETURNING categories.*, (
            SELECT icon_url
              FROM icons
              WHERE id = $3
            ) AS icon_url`,
          values: [c.name, c.slug, icon_id, c.user_id]
        };
        const result = await connection.query(query);
        return result.rows[0];
      });
    });
  }
  async getCategories(): Promise<CategoryType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: `
          SELECT categories.*, icons.* FROM categories
          JOIN icons ON categories.icon_id = icons.id
        `
      };
      const result = await connection.query(query);
      return result.rows;
    });
  }
  async getAdminCategories(user_id: string): Promise<CategoryType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: `
          SELECT categories.*, icons.* FROM categories
          JOIN icons ON categories.icon_id = icons.id
          WHERE categories.user_id = $1
        `,
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
      return this.withTransaction(connection, async () => {
        const { id: icon_id } = await icon.createIcon(connection, c);
        const query = {
          text: `
          UPDATE categories SET name=$3, slug=$4, icon_id=$5
          WHERE id=$1 AND user_id=$2
          RETURNING categories.*, (
            SELECT icon_url
            FROM icons
            WHERE id=$5
          ) AS icon_url`,
          values: [id, c.user_id, c.name, c.slug, icon_id]
        };
        const result = await connection.query(query);
        return result.rows[0];
      });
    });
  }
  async deleteCategory(id: string): Promise<CategoryType & IconType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: `
        DELETE FROM categories WHERE id=$1
        RETURNING categories.id, categories.icon_id, (
          SELECT icon_url
          FROM icons
          WHERE id = categories.icon_id
        ) AS icon_url`,
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default Category;
