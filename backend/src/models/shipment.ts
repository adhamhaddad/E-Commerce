import { PoolClient } from 'pg';
import { pgClient } from '../database';

type ShipmentType = {
  id: number;
  order_id: number;
  shipment_date: Date;
  updated_at?: Date;
};

class Shipment {
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
  async createShipment<T>(s: ShipmentType): Promise<ShipmentType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'INSERT INTO shipments (order_id, shipment_date) VALUES ($1, $2) RETURNING *',
        values: [s.order_id, s.shipment_date]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async getShipments(user_id: string): Promise<ShipmentType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT * FROM shipments WHERE user_id=$1',
        values: [user_id]
      };
      const result = await connection.query(query);
      return result.rows;
    });
  }
  async getShipment(id: string): Promise<ShipmentType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT * FROM shipments WHERE id=$1',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async updateShipment(id: string): Promise<ShipmentType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'UPDATE shipments SET updated_at=CURRENT_TIMESTAMP WHERE id=$1',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default Shipment;
