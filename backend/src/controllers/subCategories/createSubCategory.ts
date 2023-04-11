import { Request, Response } from 'express';
import SubCategory from '../../models/subCategory';

const subCategory = new SubCategory();

export const createSubCategory = async (req: Request, res: Response) => {
  try {
    const response = await subCategory.createSubCategory(req.body);
    res.status(201).json({
      status: true,
      data: response,
      message: 'Sub-category created successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
