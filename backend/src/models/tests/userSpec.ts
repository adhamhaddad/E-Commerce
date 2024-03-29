import { pgClient } from '../../database';
import User, { UserType, UserTypes, UserRole } from '../user';

const user = new User();

describe('User Model', () => {
  describe('Test methods exists', () => {
    it('expects all CRUD operation methods to be exists', () => {
      expect(user.createUser).toBeDefined();
      expect(user.getUser).toBeDefined();
      expect(user.updateUser).toBeDefined();
      expect(user.deleteUser).toBeDefined();
    });
  });
  describe('Methods returns', () => {
    const newUser1 = {
      first_name: 'Adham',
      last_name: 'Haddad',
      email: 'a.haddad@info.com',
      password: 'adham123',
      role: UserRole.OWNER
    } as UserTypes;

    const newUser2 = {
      first_name: 'Adham',
      last_name: 'Ashraf',
      email: 'adhamhaddad.dev@gmail.com',
      password: 'adham123',
      role: UserRole.CUSTOMER
    } as UserTypes;

    const updated = {
      first_name: 'Adham',
      last_name: 'Haddad',
      role: UserRole.CUSTOMER
    };

    beforeAll(async () => {
      const connection = await pgClient.connect();
      const query = {
        text: 'DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1'
      };
      await connection.query(query);
      connection.release();
      await user.createUser(newUser1);
    });
    afterAll(async () => {
      const connection = await pgClient.connect();
      const query = {
        text: 'DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1'
      };
      await connection.query(query);
      connection.release();
    });

    it('createUser method should return a new user', async () => {
      const result = await user.createUser(newUser2);
      expect(result).toEqual({
        id: 2,
        first_name: 'Adham',
        last_name: 'Ashraf',
        role: 'CUSTOMER'
      } as UserType);
    });

    it('getUser method should return Object of user', async () => {
      const result = await user.getUser('2');
      expect(result).toEqual({
        id: 2,
        first_name: 'Adham',
        last_name: 'Ashraf',
        role: 'CUSTOMER'
      } as UserType);
    });

    it('updateUser method should return object with new values', async () => {
      const result = await user.updateUser('2', updated);
      expect(result).toEqual({
        id: 2,
        first_name: 'Adham',
        last_name: 'Haddad',
        role: 'CUSTOMER'
      } as UserType);
    });

    it('deleteUser method should return object with deleted user id', async () => {
      const result = await user.deleteUser('2');
      expect(result).toEqual({
        id: 2
      } as UserType);
    });
  });
});
