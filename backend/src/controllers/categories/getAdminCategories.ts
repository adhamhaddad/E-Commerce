import { Request, Response } from 'express';
import Category from '../../models/category';

const category = new Category();

export const getAdminCategories = async (req: Request, res: Response) => {
  try {
    const response = await category.getAdminCategories(req.params.user_id);
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
