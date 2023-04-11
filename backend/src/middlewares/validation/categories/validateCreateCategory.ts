import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validate } from '../validationResult';

export const validateCreateCategory = [
  body('name')
    .exists()
    .withMessage('city is missing from the body')
    .notEmpty()
    .isString(),
  body('slug')
    .exists()
    .withMessage('postal_code is missing from the body')
    .notEmpty()
    .isNumeric()
    .withMessage('postal_code must be a number'),
  body('user_id')
    .exists()
    .withMessage('user_id is missing from the body')
    .notEmpty()
    .withMessage('user_id is empty')
    .isNumeric()
    .withMessage('user_id must be a number'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
