import { PoolClient } from 'pg';
import { pgClient } from '../database';

type OrderType = {
  id?: number;
  user_id: number;
  order_items_id: number;
  order_status: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

class Order {
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
  async createOrder(o: OrderType): Promise<OrderType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'INSERT INTO orders (user_id, order_items_id) VALUES ($1, $2) RETURNING *',
        values: [o.user_id, o.order_items_id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async getOrders(user_id: string): Promise<OrderType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT * FROM orders WHERE user_id=$1',
        values: [user_id]
      };
      const result = await connection.query(query);
      return result.rows;
    });
  }
  async getOrder(id: string): Promise<OrderType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT * FROM orders WHERE id=$1',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async updateOrder(id: string): Promise<OrderType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: "UPDATE orders SET order_status='DELIVERED', updated_at=CURRENT_TIMESTAMP WHERE id=$1 RETURNING *",
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async deleteOrder(id: string): Promise<OrderType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: "UPDATE orders SET order_status='CANCELED', updated_at=CURRENT_TIMESTAMP, deleted_at=CURRENT_TIMESTAMP WHERE id=$1 RETURNING *",
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default Order;
