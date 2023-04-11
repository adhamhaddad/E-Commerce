import { Request, Response } from 'express';
import Icon from '../../models/icons';

const icon = new Icon();

export const deleteIcon = async (req: Request, res: Response) => {
  try {
    const response = await icon.deleteIcon(req.params.id);
    res.status(200).json({
      status: true,
      data: response,
      message: 'Icon deleted successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
