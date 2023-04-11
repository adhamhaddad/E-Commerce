import { Request, Response } from 'express';
import SubCategory from '../../models/subCategory';

const subCategory = new SubCategory();

export const deleteSubCategory = async (req: Request, res: Response) => {
  try {
    const response = await subCategory.deleteSubCategory(req.params.id);
    res.status(200).json({
      status: true,
      data: response,
      message: 'Sub-categories deleted successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
