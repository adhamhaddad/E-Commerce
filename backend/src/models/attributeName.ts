import database from '../database';

type AttributeNameType = {
  id: number;
  name: string;
  variant_id: number;
};

class AttributeName {
  async createAttributeName(a: AttributeNameType): Promise<AttributeNameType> {
    const connection = await database.connect();
    try {
      const sql = `INSERT INTO attribute_names (name, variant_id) VALUES ($1, $2) RETURNING *`;
      const result = await connection.query(sql, [a.name, a.variant_id]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async getAttributeNames(id: string): Promise<AttributeNameType[]> {
    const connection = await database.connect();
    try {
      const sql = `SELECT * FROM attribute_names WHERE variant_id=$1`;
      const result = await connection.query(sql, [id]);
      return result.rows;
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async getAttributeName(id: string): Promise<AttributeNameType> {
    const connection = await database.connect();
    try {
      const sql = `SElECT * FROM attribute_names WHERE id=$1`;
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async updateAttributeName(
    id: string,
    a: AttributeNameType
  ): Promise<AttributeNameType> {
    const connection = await database.connect();
    try {
      const sql = `UPDATE attribute_names SET name=$2 WHERE id=$1 RETURNING *`;
      const result = await connection.query(sql, [id, a.name]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async deleteAttributeName(id: string): Promise<AttributeNameType> {
    const connection = await database.connect();
    try {
      const sql = `DELETE FROM attribute_names WHERE id=$1 RETURNING id`;
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
}
export default AttributeName;
