import { Request, Response } from 'express';
import AttributeName from '../../models/attributeName';

const attributeName = new AttributeName();

export const getAttributeNames = async (req: Request, res: Response) => {
  try {
    const response = await attributeName.getAttributeNames(req.params.id);
    res.status(200).json({
      status: true,
      data: response,
      message: 'Attribute names fetched successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
