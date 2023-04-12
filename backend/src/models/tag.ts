import database from '../database';

type TagType = {
  id: number;
  name: string;
  product_id: number;
};

class Tag {
  async createTag(t: TagType): Promise<TagType> {
    const connection = await database.connect();
    try {
      const sql = `INSERT INTO tags (name, product_id) VALUES ($1, $2) RETURNING *`;
      const result = await connection.query(sql, [t.name, t.product_id]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async updateTag(id: string, t: TagType): Promise<TagType> {
    const connection = await database.connect();
    try {
      const sql = `UPDATE tags SET name=$2 WHERE id=$1 RETURNING *`;
      const result = await connection.query(sql, [id, t.name]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async deleteTag(id: string): Promise<TagType> {
    const connection = await database.connect();
    try {
      const sql = `DELETE FROM tags WHERE id=$1 RETURNING id`;
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
}
export default Tag;
