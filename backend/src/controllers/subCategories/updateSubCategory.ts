import { Request, Response } from 'express';
import SubCategory from '../../models/subCategory';
import { io } from '../../server';

const subCategory = new SubCategory();

export const updateSubCategory = async (req: Request, res: Response) => {
  try {
    const response = await subCategory.updateSubCategory(
      req.params.id,
      req.body
    );
    io.emit('subCategories', { action: 'UPDATE', data: response });
    res.status(203).json({ data: response });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
