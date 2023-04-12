import { Request, Response } from 'express';
import AttributeValue from '../../models/attributeValue';

const attributeValue = new AttributeValue();

export const getAttributeValue = async (req: Request, res: Response) => {
  try {
    const response = await attributeValue.getAttributeValue(req.params.id);
    res.status(200).json({
      status: true,
      data: response,
      message: 'Attribute value fetched successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
