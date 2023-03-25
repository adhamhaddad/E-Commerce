import database from '../database';
import category from '../types/Category';

class Category {
  async createCategory(c: category): Promise<category> {
    try {
      const connection = await database.connect();
      const sql = `INSERT INTO category () VALUES () RETURNING *`;
      const result = await connection.query(sql, []);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  async getCategories(): Promise<category[]> {
    try {
      const connection = await database.connect();
      const sql = `SELECT * FROM category`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  async getCategory(id: string): Promise<category> {
    try {
      const connection = await database.connect();
      const sql = `SELECT * FROM category WHERE id=$1`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  async updateCategory(id: string, c: category): Promise<category> {
    try {
      const connection = await database.connect();
      const sql = `UPDATE category SET category_name=$2 WHERE id=$1 RETURNING *`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  async deleteCategory(id: string): Promise<category> {
    try {
      const connection = await database.connect();
      const sql = `DELETE FROM category WHERE id=$1 RETURNING *`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}
export default Category;
