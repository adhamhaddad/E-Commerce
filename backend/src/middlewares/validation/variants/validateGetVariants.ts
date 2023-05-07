import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import { validate } from '../validationResult';

export const validateGetVariants = [
  check('product_id')
    .exists()
    .withMessage('product_id is missing from the parameters')
    .notEmpty()
    .withMessage('product_id is empty'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
