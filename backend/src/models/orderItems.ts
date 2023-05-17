import { PoolClient } from 'pg';
import { pgClient } from '../database';

export type OrderItemType = {
  id?: number;
  // variant_id?: number;
  product_id: number;
  quantity: string;
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
    items: { product_id: number; quantity: string }[]
  ): Promise<OrderItemType[]> {
    const orderItems: OrderItemType[] = [];

    for (const item of items) {
      const quantity = Number(item.quantity);
      if (isNaN(quantity)) {
        throw new Error(`Invalid quantity: ${item.quantity}`);
      }

      const query = {
        text: 'INSERT INTO order_items (product_id, price, quantity) SELECT id, price, $1 FROM products WHERE id = $2 RETURNING *',
        values: [quantity, item.product_id]
      };
      const result = await connection.query(query);
      orderItems.push(result.rows[0]);
    }
    return orderItems;
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
