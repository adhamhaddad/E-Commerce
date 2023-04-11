import { Request, Response } from 'express';
import SubCategory from '../../models/subCategory';

const subCategory = new SubCategory();

export const getSubCategories = async (req: Request, res: Response) => {
  try {
    const response = await subCategory.getSubCategories(req.params.id);
    res.status(200).json({
      status: true,
      data: response,
      message: 'Sub-categories fetched successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
