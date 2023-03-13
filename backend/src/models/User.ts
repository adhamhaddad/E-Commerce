import database from '../database';
import user from '../types/User';
import { hash, compare } from '../utils/password-utils';

class User {
  async createUser(u: user): Promise<user> {
    try {
      const connection = await database.connect();
      const sql = `INSERT INTO Users (first_name, last_name, email, password, is_admin) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
      const result = await connection.query(sql, [
        u.first_name,
        u.last_name,
        u.email,
        hash(u.password),
        0
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  async getUsers(): Promise<user[]> {
    try {
      const connection = await database.connect();
      const sql = `SELECT * FROM Users WHERE is_admin='0'`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  async getUser(id: string): Promise<user> {
    try {
      const connection = await database.connect();
      const sql = `SELECT * FROM Users WHERE id=$1`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  async updateUser(id: string, u: user): Promise<user> {
    try {
      const connection = await database.connect();
      const sql = `UPDATE Users SET ${
        Object.keys(u)[0]
      }=$2 WHERE id=$1 RETURNING *`;
      const result = await connection.query(sql, [id, Object.values(u)[0]]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  async deleteUser(id: string): Promise<user> {
    try {
      const connection = await database.connect();
      const sql = `DELETE FROM Users WHERE id=$1 RETURNING *`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  async authUser(u: user): Promise<user | null | Boolean> {
    try {
      const connection = await database.connect();
      const sql = `SELECT password FROM Users WHERE email=$1`;
      const result = await connection.query(sql, [u.email]);
      if (result.rows.length) {
        const check = compare(u.password, result.rows[0].password);
        console.log(check);
        // if (check) {
        //   const sql = 'SELECT * FROM Users WHERE email=$1';
        //   const result = await connection.query(sql, [u.email]);
        //   connection.release();
        //   return result.rows[0];
        // } else {
        //   connection.release();
        //   throw new Error('Password is incorrect.');
        // }
      }
      connection.release();
      throw new Error(`User email not found!`);
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}
export default User;
