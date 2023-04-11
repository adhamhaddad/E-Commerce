import { Request, Response } from 'express';
import SubCategory from '../../models/subCategory';

const subCategory = new SubCategory();

export const updateSubCategory = async (req: Request, res: Response) => {
  try {
    const response = await subCategory.updateSubCategory(
      req.params.id,
      req.body
    );
    res.status(203).json({
      status: true,
      data: response,
      message: 'Sub-categories updated successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
