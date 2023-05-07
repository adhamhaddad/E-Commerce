import { Request, Response } from 'express';
import SubCategory from '../../models/subCategory';
import { io } from '../../server';

const subCategory = new SubCategory();

export const deleteSubCategory = async (req: Request, res: Response) => {
  try {
    const response = await subCategory.deleteSubCategory(req.params.id);
    io.emit('subCategories', { action: 'DELETE', data: response });
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
