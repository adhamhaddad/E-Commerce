import { Request, Response, NextFunction } from 'express';
import { check, body } from 'express-validator';
import { validate } from '../validationResult';

export const validateUpdatePhone = [
  check('id')
    .exists()
    .withMessage('id is missing from the parameters')
    .notEmpty()
    .withMessage('id is empty'),
  body('phone')
    .exists()
    .withMessage('phone is missing from the body')
    .notEmpty()
    .withMessage('phone is empty')
    .isMobilePhone('ar-EG')
    .withMessage('phone is not valid'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
