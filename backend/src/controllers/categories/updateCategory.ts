import { Request, Response } from 'express';
import Category from '../../models/category';
import { io } from '../../server';

const category = new Category();

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const response = await category.updateCategory(req.params.id, {
      ...req.body,
      icon_url: req?.file?.path
    });
    io.emit('categories', { action: 'UPDATE', data: response });
    res.status(203).json({ data: response });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
