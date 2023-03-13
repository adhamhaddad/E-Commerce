import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

const verify = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization as string;
    const token = authorization.split(' ')[1];
    fs.readFile(
      path.join(__dirname, '..', '..', 'keys', 'public.key'),
      { encoding: 'utf8' },
      (err, publicKey) => {
        if (err) err;
        const decode = jwt.verify(token, publicKey);
        if (decode) next();
      }
    );
  } catch (err) {
    res.status(400).json({
      status: false,
      message: (err as Error).message.includes('jwt must be provided')
        ? 'You must login first.'
        : (err as Error).message
    });
  }
};

export default verify;
