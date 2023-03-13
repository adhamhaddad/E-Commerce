import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

export const sign = (response: {}, cb: Function) => {
  return fs.readFile(
    path.join(__dirname, '..', '..', 'keys', 'private.key'),
    { encoding: 'utf8' },
    (err, privateKey) => {
      if (err) err;
      jwt.sign({ ...response }, privateKey, (err, token) => {
        if (err) err;
        return {
          status: true,
          data: { ...response, token },
          message: 'User authenticated successfully'
        };
      });
    }
  );
};

export const varify = () => {
    
}

export const verify = () => {};
