import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import { validate } from '../validationResult';

export const validateGetSubCategories = [
  check('category_id')
    .exists()
    .withMessage('category_id is missing from the parameters')
    .notEmpty()
    .withMessage('category_id is empty'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
