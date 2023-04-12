import { Request, Response } from 'express';
import AttributeName from '../../models/attributeName';

const attributeName = new AttributeName();

export const updateAttributeName = async (req: Request, res: Response) => {
  try {
    const response = await attributeName.updateAttributeName(
      req.params.id,
      req.body
    );
    res.status(203).json({
      status: true,
      data: response,
      message: 'Attribute name updated successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
