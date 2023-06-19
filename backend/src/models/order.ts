import { PoolClient } from 'pg';
import { pgClient } from '../database';
import { v4 as uuidv4 } from 'uuid';
import OrderItem, { OrderItemType } from './orderItems';

type OrderType = {
  id?: number;
  user_id: number;
  items: [{ product_id: number; quantity: string }];
  order_status: string;
  shipment_address: string;
  shipment_date: Date;
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
      return this.withTransaction(connection, async () => {
        const orderItem = new OrderItem();
        // INSERT orderItems data
        const numericItems = o.items.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity
        }));
        const orderItemResult = await orderItem.createOrderItem(
          connection,
          numericItems
        );

        // INSERT order data
        const query = {
          text: 'INSERT INTO orders (user_id, tracking_number) VALUES ($1, $2) RETURNING *',
          values: [o.user_id, uuidv4().split('-')[0]]
        };
        const result = await connection.query(query);
        const { id: order_id } = result.rows[0];

        // INSERT shipment data
        const shipmentQuery = {
          text: 'INSERT INTO shipments (order_id, shipment_address, shipment_date) VALUES ($1, $2, $3)',
          values: [order_id, o.shipment_address, o.shipment_date]
        };
        await connection.query(shipmentQuery);

        // INSERT order item bridge data
        const orderItemBridgeQuery = orderItemResult.map((item) => ({
          text: 'INSERT INTO order_items_bridge (item_id, order_id) VALUES ($1, $2) RETURNING *',
          values: [item.id, order_id]
        }));
        await Promise.all(
          orderItemBridgeQuery.map((query) => connection.query(query))
        );
        return result.rows[0];
      });
    });
  }
  async getOrders(user_id: string): Promise<OrderType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: `
        SELECT o.*, s.*, SUM(oi.price * oi.quantity) AS total_price
        FROM orders o, shipments s, order_items oi, order_items_bridge oib
        WHERE s.order_id=o.id AND oi.id=oib.item_id AND oib.order_id=o.id AND o.user_id=$1
        GROUP BY o.id, s.id
        `,
        values: [user_id]
      };
      const result = await connection.query(query);
      return result.rows;
    });
  }
  async getAdminOrders(): Promise<OrderType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: `
        SELECT o.*, s.*, SUM(oi.price * oi.quantity) AS total_price
        FROM orders o, shipments s, order_items oi, order_items_bridge oib
        WHERE s.order_id=o.id AND oi.id=oib.item_id AND oib.order_id=o.id
        GROUP BY o.id, s.id
        `
      };
      const result = await connection.query(query);
      return result.rows;
    });
  }
  async getOrder(id: string): Promise<OrderType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: `
        SELECT o.*, s.*, SUM(oi.price * oi.quantity) AS total_price
        FROM orders o, shipments s, order_items oi, order_items_bridge oib
        WHERE s.order_id=o.id AND oi.id=oib.item_id AND oib.order_id=o.id AND o.id=$1
        GROUP BY o.id, s.id
        `,
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
