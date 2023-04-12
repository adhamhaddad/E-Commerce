import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validate } from '../validationResult';

export const validateCreateAttributeName = [
  body('name')
    .exists()
    .withMessage('name is missing from the body')
    .notEmpty()
    .withMessage('name is empty')
    .isString()
    .withMessage('name must be a string'),
  body('variant_id')
    .exists()
    .withMessage('variant_id is missing from the body')
    .notEmpty()
    .withMessage('variant_id is empty')
    .isNumeric()
    .withMessage('variant_id must be a number'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
