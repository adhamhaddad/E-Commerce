import bcrypt from 'bcrypt';
import configs from '../configs';

const hash = (password: string) =>
  bcrypt.hash(`${configs.pepper}${password}${configs.pepper}`, configs.salt);

const compare = (password: string, hash: string) =>
  bcrypt.compare(`${configs.pepper}${password}${configs.pepper}`, hash);

export { hash, compare };
