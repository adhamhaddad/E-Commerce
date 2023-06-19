import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validate } from '../validationResult';

export const validateCreateUserAddress = [
  body('city')
    .exists()
    .withMessage('City is missing from the body')
    .notEmpty()
    .withMessage('City is empty')
    .isString()
    .withMessage('City must be a string'),
  body('postal_code')
    .exists()
    .withMessage('Postal code is missing from the body')
    .notEmpty()
    .withMessage('Postal code is empty')
    .isNumeric()
    .withMessage('Postal code must be a number'),
  body('address1')
    .exists()
    .withMessage('Address 1 is missing from the body')
    .notEmpty()
    .withMessage('Address 1 is empty')
    .isString()
    .withMessage('Address 1 must be a string'),
  body('address2').exists().withMessage('Address 2 is missing from the body'),
  body('user_id')
    .exists()
    .withMessage('user_id is missing from the body')
    .notEmpty()
    .withMessage('user_id is empty')
    .isNumeric()
    .withMessage('user_id must be a number'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
