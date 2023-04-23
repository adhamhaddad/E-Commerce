import { PoolClient } from 'pg';
import database from '../database';

export type VariantType = {
  id: number;
  name: string;
  slug: string;
  price: string;
  quantity: number;
  product_id: number;
};

class Variant {
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
  async createVariant(v: VariantType): Promise<VariantType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'INSERT INTO variants (name, slug, price, quantity, product_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        values: [v.name, v.price, v.quantity, v.product_id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async getVariant(id: string): Promise<VariantType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT * FROM variants WHERE product_id=$1',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows;
    });
  }
  async updateVariant(id: string, v: VariantType): Promise<VariantType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'UPDATE variants SET name=$2, slug=$3, price=$4, quantity=$5 WHERE id=$1 RETURNING *',
        value: [id, v.name, v.slug, v.price, v.quantity]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async deleteVariant(id: string) {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'DELETE FROM variants WHERE id=$1 RETURNING id',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default Variant;
