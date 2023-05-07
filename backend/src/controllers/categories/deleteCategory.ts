import { Request, Response } from 'express';
import Category from '../../models/category';
import fs from 'fs';
import path from 'path';
import { io } from '../../server';

const category = new Category();

const upload = path.join(__dirname, '..', '..', '..');
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const response = await category.deleteCategory(req.params.id);
    fs.promises.unlink(`${upload}/${response.icon_url}`);
    io.emit('categories', { action: 'DELETE', data: response });
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
