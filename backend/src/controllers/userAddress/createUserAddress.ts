import { Request, Response } from 'express';
import UserAddress from '../../models/userAddress';

const address = new UserAddress();

export const createUserAddress = async (req: Request, res: Response) => {
  try {
    const response = await address.createUserAddress(req.body);
    res.status(201).json({
      status: true,
      data: response,
      message: 'Address created successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
