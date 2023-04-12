import { Request, Response } from 'express';
import AttributeValue from '../../models/attributeValue';

const attributeValue = new AttributeValue();

export const deleteAttributeValue = async (req: Request, res: Response) => {
  try {
    const response = await attributeValue.deleteAttributeValue(req.params.id);
    res.status(200).json({
      status: true,
      data: response,
      message: 'Attribute value deleted successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
