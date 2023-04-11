import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validate } from '../validationResult';

export const validateCreateUserAddress = [
  body('city')
    .exists()
    .withMessage('city is missing from the body')
    .notEmpty()
    .isString(),
  body('postal_code')
    .exists()
    .withMessage('postal_code is missing from the body')
    .notEmpty()
    .isNumeric()
    .withMessage('postal_code must be a number'),
  body('address1')
    .exists()
    .withMessage('address1 is missing from the body')
    .notEmpty()
    .withMessage('address1 is empty')
    .isString()
    .withMessage('address1 must be a string'),
  body('address2')
    .exists()
    .withMessage('address2 is missing from the body')
    .notEmpty()
    .isString()
    .withMessage('address2 must be a string'),
  body('user_id')
    .exists()
    .withMessage('user_id is missing from the body')
    .notEmpty()
    .withMessage('user_id is empty')
    .isNumeric()
    .withMessage('user_id must be a number'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
