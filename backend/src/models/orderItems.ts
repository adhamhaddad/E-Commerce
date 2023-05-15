import { PoolClient } from 'pg';
import { pgClient } from '../database';

export type OrderItemType = {
  id?: number;
  // variant_id?: number;
  product_id: number;
  quantity: number;
};

class OrderItem {
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
  async createOrderItem(
    connection: PoolClient,
    items: { product_id: number; quantity: number }[]
  ): Promise<OrderItemType[]> {
    const query = {
      text: 'INSERT INTO order_items (product_id, price, quantity) SELECT id, price, $1 FROM products WHERE id = ANY($2) RETURNING *',
      values: [
        items.map((item) => item.quantity).flat(),
        items.map((item) => item.product_id)
      ]
    };
    const result = await connection.query(query);
    console.log(result.rows);
    return result.rows;
  }

  async getOrderItems(user_id: string): Promise<OrderItemType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT * FROM order_items WHERE user_id=$1',
        values: [user_id]
      };
      const result = await connection.query(query);
      return result.rows;
    });
  }
  async getOrderItem(id: string): Promise<OrderItemType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT * FROM order_items WHERE id=$1',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async deleteOrderItem(id: string): Promise<OrderItemType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'DELETE FROM order_items WHERE id=$1',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default OrderItem;
