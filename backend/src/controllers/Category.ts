import { Request, Response } from 'express';
import Category from '../models/Category';

const category = new Category();

export const createCategory = async (req: Request, res: Response) => {
  try {
    const response = await category.createCategory(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Category created successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: (err as Error).message
    });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const response = await category.getCategories();
    res.status(200).json({
      status: true,
      data: response,
      message: 'Categories fetched successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: (err as Error).message
    });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    const response = await category.getCategory(req.params.id);
    res.status(200).json({
      status: true,
      data: { ...response },
      message: 'Category fetched successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: (err as Error).message
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const response = await category.updateCategory(req.params.id, req.body);
    res.status(204).json({
      status: true,
      data: { ...response },
      message: 'Category updated successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: (err as Error).message
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const response = await category.deleteCategory(req.params.id);
    res.status(200).json({
      status: true,
      data: { ...response },
      message: 'Category deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: (err as Error).message
    });
  }
};
