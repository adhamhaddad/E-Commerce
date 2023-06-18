import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validate } from '../validationResult';

export const validateCreatePhone = [
  body('phone')
    .exists()
    .withMessage('Phone number is missing from the body')
    .notEmpty()
    .withMessage('Phone number is empty')
    .isMobilePhone('ar-EG')
    .withMessage('Phone number is not valid'),
  body('user_id')
    .exists()
    .withMessage('user_id is missing from the body')
    .notEmpty()
    .withMessage('user_id is empty')
    .isNumeric()
    .withMessage('user_id must be number'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
