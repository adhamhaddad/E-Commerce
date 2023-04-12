import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validate } from '../validationResult';

export const validateCreateAttributeValue = [
  body('value')
    .exists()
    .withMessage('value is missing from the body')
    .notEmpty()
    .withMessage('value is empty')
    .isString()
    .withMessage('value must be a string'),
  body('attribute_id')
    .exists()
    .withMessage('attribute_id is missing from the body')
    .notEmpty()
    .withMessage('attribute_id is empty')
    .isNumeric()
    .withMessage('attribute_id must be a number'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
