import { PoolClient } from 'pg';
import { pgClient } from '../database';

type AttributeValueType = {
  id: number;
  value: string;
  attribute_id: number;
};

class AttributeValue {
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
  async createAttributeValue(
    a: AttributeValueType
  ): Promise<AttributeValueType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'INSERT INTO attribute_values (name, attribute_id) VALUES ($1, $2) RETURNING *',
        values: [a.value, a.attribute_id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async getAttributeValues(id: string): Promise<AttributeValueType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT * FROM attribute_values WHERE attribute_id=$1',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows;
    });
  }
  async getAttributeValue(id: string): Promise<AttributeValueType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SElECT * FROM attribute_values WHERE id=$1',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async updateAttributeValue(
    id: string,
    a: AttributeValueType
  ): Promise<AttributeValueType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'UPDATE attribute_values SET value=$2 WHERE id=$1 RETURNING *',
        values: [id, a.value]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async deleteAttributeValue(id: string): Promise<AttributeValueType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'DELETE FROM attribute_values WHERE id=$1 RETURNING id',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default AttributeValue;
