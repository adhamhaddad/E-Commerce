import bcrypt from 'bcrypt';
import configs from '../configs';
import fs from 'fs';
import path from 'path';

const hash = (password: string) => {
  fs.readFile(
    path.join(__dirname, '..', '..', 'keys', 'private.key'),
    { encoding: 'utf8' },
    (err, privateKey) => {
      if (err) err;
      const pass = bcrypt.hash(
        `${privateKey}${password}`,
        configs.salt_rounds,
        (err, encrypted) => {
          if (err) err;
          return encrypted;
        }
      );
    }
  );
};

const compare = (password: string, hash: string) => {
  return bcrypt.compare(hash, password, (err, info) => {
    if (err) err;
  });
};
export { hash, compare };
