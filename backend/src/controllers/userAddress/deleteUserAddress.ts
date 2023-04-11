import { Request, Response } from 'express';
import UserAddress from '../../models/userAddress';

const address = new UserAddress();

export const deleteUserAddress = async (req: Request, res: Response) => {
  try {
    const response = await address.deleteUserAddress(req.params.id);
    res.status(200).json({
      status: true,
      data: response,
      message: 'Address deleted successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
