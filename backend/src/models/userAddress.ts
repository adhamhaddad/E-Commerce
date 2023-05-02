import { PoolClient } from 'pg';
import { pgClient } from '../database';

type UserAddressType = {
  id: number;
  country?: string;
  city: string;
  postal_code: number;
  address1: string;
  address2: string;
  user_id: number;
};

class UserAddress {
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
  async createUserAddress(a: UserAddressType): Promise<UserAddressType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'INSERT INTO user_addresses (city, postal_code, address1, address2, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        values: [a.city, a.postal_code, a.address1, a.address2, a.user_id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async getUserAddresses(user_id: string): Promise<UserAddressType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SElECT * FROM user_addresses WHERE user_id=$1',
        values: [user_id]
      };
      const result = await connection.query(query);
      return result.rows;
    });
  }
  async updateUserAddress(
    id: string,
    a: UserAddressType
  ): Promise<UserAddressType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'UPDATE user_addresses SET city=$2, postal_code=$3, address1=$4, address2=$5 WHERE id=$1 RETURNING *',
        values: [id, a.city, a.postal_code, a.address1, a.address2]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async deleteUserAddress(id: string): Promise<UserAddressType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'DELETE FROM user_addresses WHERE id=$1 RETURNING id',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default UserAddress;
