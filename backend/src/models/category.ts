import database from '../database';

type CategoryType = {
  id: string;
  name: string;
  slug: string;
  user_id: string;
};

class Category {
  async createCategory(c: CategoryType): Promise<CategoryType> {
    const connection = await database.connect();
    try {
      const sql = `INSERT INTO categories (name, slug, user_id) VALUES ($1, $2, $3) RETURNING *`;
      const result = await connection.query(sql, [c.name, c.slug, c.user_id]);
      return result.rows[0];
    } catch (err) {
      throw new Error((err as Error).message);
    } finally {
      connection.release();
    }
  }
  async getCategories(id: string): Promise<CategoryType[]> {
    const connection = await database.connect();
    try {
      const sql = `SELECT * FROM categories WHERE user_id=$1`;
      const result = await connection.query(sql, [id]);
      return result.rows;
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async updateCategory(id: string, c: CategoryType): Promise<CategoryType> {
    const connection = await database.connect();
    try {
      const sql = `UPDATE categories SET name=$2, slug=$3 WHERE id=$1 RETURNING *`;
      const result = await connection.query(sql, [id, c.name, c.slug]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async deleteCategory(id: string): Promise<CategoryType> {
    const connection = await database.connect();
    try {
      const sql = `DELETE FROM categories WHERE id=$1 RETURNING *`;
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
}
export default Category;
