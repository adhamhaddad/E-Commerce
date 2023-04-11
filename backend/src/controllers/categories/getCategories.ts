import { Request, Response } from 'express';
import Category from '../../models/category';

const category = new Category();

export const getCategories = async (req: Request, res: Response) => {
  try {
    const response = await category.getCategories(req.params.id);
    res.status(200).json({
      status: true,
      data: response,
      message: 'Category fetched successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
