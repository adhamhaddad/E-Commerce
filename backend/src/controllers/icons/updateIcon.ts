import { Request, Response } from 'express';
import Icon from '../../models/icons';

const icon = new Icon();

export const updateIcon = async (req: Request, res: Response) => {
  try {
    const response = await icon.updateIcon(req.params.id, req.body);
    res.status(203).json({
      status: true,
      data: response,
      message: 'Icon updated successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
