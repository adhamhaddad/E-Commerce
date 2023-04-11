import { Request, Response } from 'express';
import Category from '../../models/category';

const category = new Category();

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const response = await category.deleteCategory(req.params.id);
    res.status(200).json({
      status: true,
      data: response,
      message: 'Category deleted successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
