import { Request, Response } from 'express';
import Product from '../../models/product';
import { io } from '../../server';

const product = new Product();

export const createProduct = async (req: Request, res: Response) => {
  try {
    const response = await product.createProduct({
      ...req.body,
      image_url: req?.file?.path
    });
    io.emit('products', { action: 'CREATE', data: response });
    res.status(201).json({ data: response });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
