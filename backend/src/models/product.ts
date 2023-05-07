import { PoolClient } from 'pg';
import { pgClient } from '../database';
import { VariantType } from './variant';

type ProductImage = {
  id: number;
  image_url: string;
  product_id: number;
};

type ProductType = {
  id: number;
  name: string;
  slug: string;
  product_desc: string;
  price: string;
  category_id: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

type ProductTypes = ProductType & ProductImage;

class Product {
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
  async withTransaction<T>(
    connection: PoolClient,
    callback: () => Promise<T>
  ): Promise<T> {
    try {
      await connection.query('BEGIN');
      const result = await callback();
      await connection.query('COMMIT');
      return result;
    } catch (error) {
      await connection.query('ROLLBACK');
      throw error;
    }
  }
  async createProduct(p: ProductTypes): Promise<ProductTypes> {
    return this.withConnection(async (connection: PoolClient) => {
      return this.withTransaction(connection, async () => {
        const query = {
          text: 'INSERT INTO products (name, slug, product_desc, price, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING id',
          values: [p.name, p.slug, p.product_desc, p.price, p.category_id]
        };
        const result = await connection.query(query);
        const { id: product_id } = result.rows[0];
        const imageQuery = {
          text: 'INSERT INTO product_images (image_url, product_id) VALUES ($1, $2) RETURNING image_url',
          values: [p.image_url, product_id]
        };
        const imageResult = await connection.query(imageQuery);
        return { ...result.rows[0], ...imageResult.rows[0] };
      });
    });
  }
  async getAllProducts(): Promise<ProductType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: `
            SELECT p.*, pi.image_url 
            FROM products p 
            INNER JOIN product_images pi ON p.id = pi.product_id
        `
      };
      const result = await connection.query(query);
      return result.rows;
    });
  }
  async getProducts(category_id: string): Promise<ProductType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: `
            SELECT p.*, pi.image_url 
            FROM products p 
            INNER JOIN product_images pi ON p.id = pi.product_id 
            WHERE p.category_id = $1
        `,
        values: [category_id]
      };
      const result = await connection.query(query);
      return result.rows;
    });
  }
  async getProduct(id: string): Promise<ProductType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: `
            SELECT p.*, pi.image_url 
            FROM products p 
            INNER JOIN product_images pi ON p.id = pi.product_id 
            WHERE p.id = $1
        `,
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async updateProduct(id: string, p: ProductType): Promise<ProductType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'UPDATE products SET name=$2, slug=$3, product_desc=$4 WHERE id=$1 RETURNING *',
        values: [id, p.name, p.slug, p.product_desc]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async deleteProduct(id: string): Promise<ProductType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'DELETE FROM products WHERE id=$1 RETURNING id',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default Product;
