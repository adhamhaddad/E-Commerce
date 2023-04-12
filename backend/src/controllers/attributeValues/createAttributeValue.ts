import { Request, Response } from 'express';
import AttributeValue from '../../models/attributeValue';

const attributeValue = new AttributeValue();

export const createAttributeValue = async (req: Request, res: Response) => {
  try {
    const response = await attributeValue.createAttributeValue(req.body);
    res.status(201).json({
      status: true,
      data: response,
      message: 'Attribute value created successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
