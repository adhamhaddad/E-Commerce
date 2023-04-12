import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validate } from '../validationResult';

export const validateCreateIcon = [
  body('icon_url').custom((value, { req }) => {
    if (!req.file) {
      throw new Error('File is required');
    }
    return true;
  }),
  body('category_id')
    .exists()
    .withMessage('category_id is missing from the body')
    .notEmpty()
    .withMessage('category_id is empty')
    .isNumeric()
    .withMessage('category_id must be a number'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
