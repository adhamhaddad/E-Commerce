import { Request, Response } from 'express';
import Tag from '../../models/tag';

const tag = new Tag();

export const createTag = async (req: Request, res: Response) => {
  try {
    const response = await tag.createTag(req.body);
    res.status(201).json({
      status: true,
      data: response,
      message: 'Tag created successfully.'
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: (error as Error).message
    });
  }
};
