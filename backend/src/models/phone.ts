import database from '../database';

type PhoneType = {
  id: number;
  phone: string;
  user_id: number;
};

class Phone {
  async createPhone(p: PhoneType): Promise<PhoneType> {
    const connection = await database.connect();
    try {
      const sql = `INSERT INTO phones (phone, user_id) VALUES ($1, $2) RETURNING *`;
      const result = await connection.query(sql, [p.phone, p.user_id]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async getPhones(id: string): Promise<PhoneType[]> {
    const connection = await database.connect();
    try {
      const sql = `SELECT * FROM phones WHERE user_id=$1`;
      const result = await connection.query(sql, [id]);
      return result.rows;
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async updatePhone(id: string, p: PhoneType): Promise<PhoneType> {
    const connection = await database.connect();
    try {
      const sql = `UPDATE phones SET phone=$2, is_default='FALSE', is_verified='FALSE' WHERE id=$1 RETURNING *`;
      const result = await connection.query(sql, [id, p.phone]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async deletePhone(id: string): Promise<PhoneType> {
    const connection = await database.connect();
    try {
      const sql = `DELETE FROM phones WHERE id=$1 RETURNING id`;
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
}
export default Phone;
