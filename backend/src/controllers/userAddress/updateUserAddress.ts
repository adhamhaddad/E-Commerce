import { Request, Response } from 'express';
import UserAddress from '../../models/userAddress';

const address = new UserAddress();

export const updateUserAddress = async (req: Request, res: Response) => {
  try {
    const response = await address.updateUserAddress(req.params.id, req.body);
    res.status(203).json({
      status: true,
      data: response,
      message: 'Address updated successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
