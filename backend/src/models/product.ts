import database from '../database';

type ProductType = {
  id: string;
  name: string;
  slug: string;
  created_at: Date;
};

class Product {
  async createProduct(p: ProductType): Promise<ProductType> {
    try {
      const connection = await database.connect();
      const sql = `INSERT INTO products (product_name, product_price) VALUES ($1, $2) RETURNING *`;
      const result = await connection.query(sql, [
        p.name,
        p.slug
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  async getProducts(): Promise<ProductType[]> {
    try {
      const connection = await database.connect();
      const sql = `SELECT * FROM products`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  async getProduct(id: string): Promise<ProductType> {
    try {
      const connection = await database.connect();
      const sql = `SELECT * FROM products WHERE id=$1`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  async updateProduct(id: string, p: ProductType): Promise<ProductType> {
    try {
      const connection = await database.connect();
      const sql = `UPDATE products SET product_name=$2, product_price=$3 RETURNING *`;
      const result = await connection.query(sql, [
        id,
        p.product_name,
        p.product_price
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  async deleteProduct(id: string): Promise<ProductType> {
    try {
      const connection = await database.connect();
      const sql = `DELETE FROM products WHERE id=$1 RETURNING *`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}
export default Product;
