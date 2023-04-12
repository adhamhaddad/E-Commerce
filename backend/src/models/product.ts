import database from '../database';

type ProductType = {
  id: number;
  name: string;
  slug: string;
  product_desc: string;
  created_at: Date;
};

type VariantType = {
  id: number;
  name: string;
  slug: string;
  price: string;
  quantity: number;
  product_id: number;
};

type ProductTypes = ProductType & VariantType;

class Product {
  async createProduct(p: ProductType): Promise<ProductType> {
    const connection = await database.connect();
    try {
      const productSQL = `INSERT INTO products (name, slug, product_desc) VALUES ($1, $2, $3) RETURNING id`;
      await connection.query('BEGIN');
      const result = await connection.query(productSQL, [
        p.name,
        p.slug,
        p.product_desc
      ]);
      const { id } = result.rows[0];
      const variantSQL = `INSERT INTO variants (name, slug, price, quantity, product_id) VALUES ($1, $2, $3, $4, $5)`;
      await connection.query(variantSQL, [,id]);

      await connection.query('COMMIT');
      return result.rows[0];
    } catch (error) {
      connection.query('ROLLBACK');
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
}
export default Product;