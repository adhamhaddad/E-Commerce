import { Request, Response } from 'express';
import Category from '../../models/category';
import { io } from '../../server';

const category = new Category();

export const createCategory = async (req: Request, res: Response) => {
  try {
    const response = await category.createCategory({
      ...req.body,
      icon_url: req?.file?.path
    });
    io.emit('categories', { action: 'CREATE', data: response });
    res.status(201).json({
      status: true,
      data: response,
      message: 'Category created successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
