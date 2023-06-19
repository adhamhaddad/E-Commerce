import { Request, Response, NextFunction } from 'express';
import fs from 'fs/promises';
import path from 'path';

const UPLOAD = path.join(__dirname, '..', '..', 'uploads');
const ICONS = path.join(__dirname, '..', '..', 'uploads', 'icons');
const PRODUCTS = path.join(__dirname, '..', '..', 'uploads', 'products');
const AVATARS = path.join(__dirname, '..', '..', 'uploads', 'avatars');

export const checkFolder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check if upload folder exists
    await fs.access(UPLOAD);
    // Upload folder exists, call next middleware
    next();
  } catch (err) {
    // Upload folder does not exist, create it
    try {
      await fs.mkdir(UPLOAD);
      await fs.mkdir(ICONS);
      await fs.mkdir(PRODUCTS);
      await fs.mkdir(AVATARS);
      next();
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
};
