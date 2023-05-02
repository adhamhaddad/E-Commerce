import { Request, Response } from 'express';
import SubCategory from '../../models/subCategory';

const subCategory = new SubCategory();

export const getSubCategory = async (req: Request, res: Response) => {
  try {
    const response = await subCategory.getSubCategory(req.params.id);
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
