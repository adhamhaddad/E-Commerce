import { Request, Response } from 'express';
import AttributeValue from '../../models/attributeValue';

const attributeValue = new AttributeValue();

export const updateAttributeValue = async (req: Request, res: Response) => {
  try {
    const response = await attributeValue.updateAttributeValue(
      req.params.id,
      req.body
    );
    res.status(203).json({
      status: true,
      data: response,
      message: 'Attribute value updated successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
