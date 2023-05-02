import { PoolClient } from 'pg';
import { pgClient } from '../database';

type VariantImageType = {
  id: number;
  image_url: string;
  variant_id: number;
};

class VariantImage {
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
  async createVariantImage(v: VariantImageType): Promise<VariantImageType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'INSERT INTO variant_images (image_url, variant_id) VALUES ($1, $2) RETURNING *',
        values: [v.image_url, v.variant_id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async getVariantImages(variant_id: string): Promise<VariantImageType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT * FROM variant_images WHERE variant_id=$1',
        values: [variant_id]
      };
      const result = await connection.query(query);
      return result.rows;
    });
  }
  async updateVariant(
    id: string,
    v: VariantImageType
  ): Promise<VariantImageType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'UPDATE variant_images SET image_url=$2 WHERE id=$1 RETURNING *',
        value: [id, v.image_url]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async deleteVariant(id: string) {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'DELETE FROM variant_images WHERE id=$1 RETURNING id',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default VariantImage;
