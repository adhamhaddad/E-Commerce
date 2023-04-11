import { Request, Response } from 'express';
import Category from '../../models/category';

const category = new Category();

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const response = await category.updateCategory(req.params.id, req.body);
    res.status(203).json({
      status: true,
      data: response,
      message: 'Category updated successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
