import { Request, Response } from 'express';
import Tag from '../../models/tag';

const tag = new Tag();

export const updateTag = async (req: Request, res: Response) => {
  try {
    const response = await tag.updateTag(req.params.id, req.body);
    res.status(203).json({
      status: true,
      data: response,
      message: 'Tag updated successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
