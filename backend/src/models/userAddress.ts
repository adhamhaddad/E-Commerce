import database from '../database';

type UserAddressType = {
  id: number;
  city: string;
  postal_code: number;
  address1: string;
  address2: string;
  user_id: number;
};

class UserAddress {
  async createUserAddress(a: UserAddressType): Promise<UserAddressType> {
    const connection = await database.connect();
    try {
      const sql = `INSERT INTO user_address (city, postal_code, address1, address2, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
      const result = await connection.query(sql, [
        a.city,
        a.postal_code,
        a.address1,
        a.address2,
        a.user_id
      ]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async getUserAddresses(id: string): Promise<UserAddressType[]> {
    const connection = await database.connect();
    try {
      const sql = `SElECT * FROM user_address WHERE user_id=$1`;
      const result = await connection.query(sql, [id]);
      return result.rows;
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async updateUserAddress(
    id: string,
    a: UserAddressType
  ): Promise<UserAddressType> {
    const connection = await database.connect();
    try {
      const sql = `UPDATE user_address SET city=$2, postal_code=$3, address1=$4, address2=$5 WHERE id=$1 RETURNING *`;
      const result = await connection.query(sql, [
        id,
        a.city,
        a.postal_code,
        a.address1,
        a.address2
      ]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async deleteUserAddress(id: string): Promise<UserAddressType> {
    const connection = await database.connect();
    try {
      const sql = `DELETE FROM user_address WHERE id=$1 RETURNING id`;
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
}
export default UserAddress;
