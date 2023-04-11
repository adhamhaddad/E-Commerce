import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validate } from '../validationResult';

export const validateCreatePhone = [
  body('phone')
    .exists()
    .withMessage('phone is missing from the body')
    .notEmpty()
    .withMessage('phone is empty')
    .isMobilePhone('ar-EG')
    .withMessage('phone is not valid'),
  body('user_id')
    .exists()
    .withMessage('user_id is missing from the body')
    .notEmpty()
    .withMessage('user_id is empty')
    .isNumeric()
    .withMessage('user_id must be number'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
