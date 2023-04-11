import database from '../database';

type IconType = {
  id: string;
  icon_url: string;
  category_id: number;
};

class Icon {
  async updateIcon(id: string, i: IconType): Promise<IconType> {
    const connection = await database.connect();
    try {
      const sql = 'UPDATE icons SET icon_url=$2 WHERE id=$1 RETURNING *';
      const result = await connection.query(sql, [i.icon_url, id]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async deleteIcon(id: string): Promise<IconType> {
    const connection = await database.connect();
    try {
      const sql = 'DELETE FROM icons WHERE id=$1 RETURNING id';
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
}
export default Icon;
