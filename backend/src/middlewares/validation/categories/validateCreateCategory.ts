import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validate } from '../validationResult';

export const validateCreateCategory = [
  body('name')
    .exists()
    .withMessage('name is missing from the body')
    .notEmpty()
    .withMessage('name is empty')
    .isString()
    .withMessage('name must be a string'),
  body('slug')
    .exists()
    .withMessage('slug is missing from the body')
    .notEmpty()
    .withMessage('slug is empty')
    .isString()
    .withMessage('slug must be a string'),
  body('user_id')
    .exists()
    .withMessage('user_id is missing from the body')
    .notEmpty()
    .withMessage('user_id is empty')
    .isNumeric()
    .withMessage('user_id must be a number'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
