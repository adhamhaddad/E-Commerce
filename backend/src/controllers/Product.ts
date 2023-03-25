import { Request, Response } from 'express';
import Product from '../models/Product';

const product = new Product();

export const createProduct = async (req: Request, res: Response) => {
  try {
    const response = await product.createProduct(req.body);
    res.status(201).json({
      status: true,
      data: { ...response },
      message: 'Product created successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: (err as Error).message
    });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const response = await product.getProducts();
    res.status(200).json({
      status: true,
      data: response,
      message: 'Products fetched successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: (err as Error).message
    });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const response = await product.getProduct(req.params.id);
    res.status(200).json({
      status: true,
      data: { ...response },
      message: 'Product fetched successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: (err as Error).message
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const response = await product.updateProduct(req.params.id, req.body);
    res.status(204).json({
      status: true,
      data: { ...response },
      message: 'Product updated successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: (err as Error).message
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const response = await product.deleteProduct(req.params.id);
    res.status(200).json({
      status: true,
      data: { ...response },
      message: 'Product deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: (err as Error).message
    });
  }
};
