import { Request, Response } from 'express';
import Tag from '../../models/tag';

const tag = new Tag();

export const deleteTag = async (req: Request, res: Response) => {
  try {
    const response = await tag.deleteTag(req.params.id);
    res.status(200).json({
      status: true,
      data: response,
      message: 'Tag deleted successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
