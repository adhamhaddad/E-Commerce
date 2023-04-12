import { Request, Response } from 'express';
import Icon from '../../models/icons';

const icon = new Icon();

export const createIcon = async (req: Request, res: Response) => {
  try {
    const body = {
      icon_url: req.file?.path as string,
      category_id: req.body.category_id
    };
    const response = await icon.createIcon(body);
    res.status(200).json({
      status: true,
      data: response,
      message: 'Icon created successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
