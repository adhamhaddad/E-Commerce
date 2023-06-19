import { Request, Response, NextFunction } from 'express';
import { check, body } from 'express-validator';
import { validate } from '../validationResult';

export const validateUpdateOrder = [
  check('id')
    .exists()
    .withMessage('id is missing from the parameters')
    .notEmpty()
    .withMessage('id is empty'),
  body('user_id')
    .exists()
    .withMessage('user_id is missing from the body')
    .notEmpty()
    .withMessage('user_id is empty')
    .isNumeric()
    .withMessage('user_id must be a number'),
  body('items')
    .exists()
    .withMessage('items is missing from the body')
    .notEmpty()
    .withMessage('items is empty')
    .isArray()
    .withMessage('items must be an array'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
