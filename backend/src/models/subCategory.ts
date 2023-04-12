import database from '../database';

type SubCategoryType = {
  id: number;
  name: string;
  slug: string;
  category_id: number;
};

class SubCategory {
  async createSubCategory(c: SubCategoryType): Promise<SubCategoryType> {
    const connection = await database.connect();
    try {
      const sql = `INSERT INTO sub_categories (name, slug, category_id) VALUES ($1, $2, $3) RETURNING *`;
      const result = await connection.query(sql, [c.name, c.category_id]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async getSubCategories(id: string): Promise<SubCategoryType[]> {
    const connection = await database.connect();
    try {
      const sql = 'SELECT * FROM sub_categories WHERE category_id=$1';
      const result = await connection.query(sql, [id]);
      return result.rows;
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async updateSubCategory(
    id: string,
    c: SubCategoryType
  ): Promise<SubCategoryType> {
    const connection = await database.connect();
    try {
      const sql = `UPDATE sub_categories SET name=$2, slug=$3 WHERE id=$1 RETURNING *`;
      const result = await connection.query(sql, [id, c.name, c.slug]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async deleteSubCategory(id: string): Promise<SubCategoryType> {
    const connection = await database.connect();
    try {
      const sql = `DELETE FROM sub_categories WHERE id=$1 RETURNING id`;
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
}
export default SubCategory;
