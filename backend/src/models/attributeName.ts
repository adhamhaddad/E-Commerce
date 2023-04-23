import { PoolClient } from 'pg';
import database from '../database';

type AttributeNameType = {
  id: number;
  name: string;
  variant_id: number;
};

class AttributeName {
  async withConnection<T>(
    callback: (connection: PoolClient) => Promise<T>
  ): Promise<T> {
    const connection = await database.connect();
    try {
      return await callback(connection);
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async createAttributeName(a: AttributeNameType): Promise<AttributeNameType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'INSERT INTO attribute_names (name, variant_id) VALUES ($1, $2) RETURNING *',
        values: [a.name, a.variant_id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async getAttributeNames(id: string): Promise<AttributeNameType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT * FROM attribute_names WHERE variant_id=$1',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows;
    });
  }
  async getAttributeName(id: string): Promise<AttributeNameType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SElECT * FROM attribute_names WHERE id=$1',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async updateAttributeName(
    id: string,
    a: AttributeNameType
  ): Promise<AttributeNameType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'UPDATE attribute_names SET name=$2 WHERE id=$1 RETURNING *',
        values: [id, a.name]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async deleteAttributeName(id: string): Promise<AttributeNameType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'DELETE FROM attribute_names WHERE id=$1 RETURNING id',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default AttributeName;
