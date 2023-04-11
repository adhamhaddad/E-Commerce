import { Request, Response, NextFunction } from 'express';
import { body, check } from 'express-validator';
import { validate } from '../validationResult';

export const validateUpdateSubCategory = [
  check('id')
    .exists()
    .withMessage('id is missing from the parameters')
    .notEmpty()
    .withMessage('id is empty'),
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
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
