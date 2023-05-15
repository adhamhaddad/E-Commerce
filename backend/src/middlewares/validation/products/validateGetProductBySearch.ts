import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import { validate } from '../validationResult';

export const validateGetProductBySearch = [
  check('name')
    .exists()
    .withMessage('name is missing from the parameters')
    .notEmpty()
    .withMessage('name is empty'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
