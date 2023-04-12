import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validate } from '../validationResult';

export const validateCreateTag = [
  body('name')
    .exists()
    .withMessage('name is missing from the body')
    .notEmpty()
    .isString(),
  body('product_id')
    .exists()
    .withMessage('product_id is missing from the body')
    .notEmpty()
    .withMessage('product_id is empty')
    .isNumeric()
    .withMessage('product_id must be a number'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
