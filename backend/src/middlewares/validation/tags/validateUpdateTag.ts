import { Request, Response, NextFunction } from 'express';
import { body, check } from 'express-validator';
import { validate } from '../validationResult';

export const validateUpdateTag = [
  check('id')
    .exists()
    .withMessage('id is missing from the parameters')
    .notEmpty()
    .withMessage('id is empty'),
  body('name')
    .exists()
    .withMessage('name is missing from the body')
    .notEmpty()
    .isString(),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
