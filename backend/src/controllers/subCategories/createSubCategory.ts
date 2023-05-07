import { Request, Response } from 'express';
import SubCategory from '../../models/subCategory';
import { io } from '../../server';

const subCategory = new SubCategory();

export const createSubCategory = async (req: Request, res: Response) => {
  try {
    const response = await subCategory.createSubCategory(req.body);
    io.emit('subCategories', { action: 'CREATE', data: response });
    res.status(201).json({ data: response });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
