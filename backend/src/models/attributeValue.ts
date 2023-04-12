import database from '../database';

type AttributeValueType = {
  id: number;
  value: string;
  attribute_id: number;
};

class AttributeValue {
  async createAttributeValue(
    a: AttributeValueType
  ): Promise<AttributeValueType> {
    const connection = await database.connect();
    try {
      const sql = `INSERT INTO attribute_values (name, attribute_id) VALUES ($1, $2) RETURNING *`;
      const result = await connection.query(sql, [a.value, a.attribute_id]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async getAttributeValues(id: string): Promise<AttributeValueType[]> {
    const connection = await database.connect();
    try {
      const sql = `SELECT * FROM attribute_values WHERE attribute_id=$1`;
      const result = await connection.query(sql, [id]);
      return result.rows;
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async getAttributeValue(id: string): Promise<AttributeValueType> {
    const connection = await database.connect();
    try {
      const sql = `SElECT * FROM attribute_values WHERE id=$1`;
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async updateAttributeValue(
    id: string,
    a: AttributeValueType
  ): Promise<AttributeValueType> {
    const connection = await database.connect();
    try {
      const sql = `UPDATE attribute_values SET value=$2 WHERE id=$1 RETURNING *`;
      const result = await connection.query(sql, [id, a.value]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async deleteAttributeValue(id: string): Promise<AttributeValueType> {
    const connection = await database.connect();
    try {
      const sql = `DELETE FROM attribute_values WHERE id=$1 RETURNING id`;
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
}
export default AttributeValue;
