import fs from 'fs';
import path from 'path';
import jwt, { SignOptions } from 'jsonwebtoken';
import configs from '../configs';

type Payload = {
  id: string;
  first_name: string;
  last_name: string;
  role: string;
  joined: Date;
};

const privateAccessToken = path.join(
  __dirname,
  '..',
  '..',
  'keys',
  'accessToken',
  'private.key'
);
const publicAccessToken = path.join(
  __dirname,
  '..',
  '..',
  'keys',
  'accessToken',
  'public.key'
);
const privateRefreshToken = path.join(
  __dirname,
  '..',
  '..',
  'keys',
  'refreshToken',
  'private.key'
);
const publicRefreshToken = path.join(
  __dirname,
  '..',
  '..',
  'keys',
  'refreshToken',
  'public.key'
);

export const signAccessToken = async (payload: Payload) => {
  const options: SignOptions = {
    algorithm: 'RS256',
    expiresIn: configs.access_expires,
    audience: payload.id
  };
  return new Promise((resolve, reject) => {
    fs.readFile(privateAccessToken, { encoding: 'utf8' }, (err, key) => {
      if (err) err;
      jwt.sign(payload, key, options, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  });
};

export const verifyAccessToken = async (payload: Payload) => {
  
};

export const signRefreshToken = async (payload: Payload) => {
  const options: SignOptions = {
    algorithm: 'RS256',
    expiresIn: configs.refresh_expires,
    audience: payload.id
  };
  return new Promise((resolve, reject) => {
    fs.readFile(privateRefreshToken, { encoding: 'utf8' }, (err, key) => {
      if (err) err;
      jwt.sign(payload, key, options, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  });
};

export const verifyRefreshToken = () => {};
