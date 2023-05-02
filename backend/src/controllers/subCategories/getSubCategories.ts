import { Request, Response } from 'express';
import SubCategory from '../../models/subCategory';

const subCategory = new SubCategory();

export const getSubCategories = async (req: Request, res: Response) => {
  try {
    const response = await subCategory.getSubCategories(req.params.category_id);
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
