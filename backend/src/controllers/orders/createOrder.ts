import { Request, Response } from 'express';
import Order from '../../models/order';

const order = new Order();

export const createOrder = async (req: Request, res: Response) => {
  try {
    const response = await order.createOrder(req.body);
    res.status(201).json({ data: response });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
