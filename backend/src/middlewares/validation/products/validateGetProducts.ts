import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import { validate } from '../validationResult';

export const validateGetProducts = [
  check('sub_category_id')
    .exists()
    .withMessage('sub_category_id is missing from the parameters')
    .notEmpty()
    .withMessage('sub_category_id is empty'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
