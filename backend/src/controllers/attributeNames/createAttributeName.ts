import { Request, Response } from 'express';
import AttributeName from '../../models/attributeName';

const attributeName = new AttributeName();

export const createAttributeName = async (req: Request, res: Response) => {
  try {
    const response = await attributeName.createAttributeName(req.body);
    res.status(201).json({
      status: true,
      data: response,
      message: 'Attribute name created successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
