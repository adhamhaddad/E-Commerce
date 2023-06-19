import { Request, Response, NextFunction } from 'express';
import { body, check } from 'express-validator';
import { validate } from '../validationResult';

export const validateUpdateUserAddress = [
  check('id')
    .exists()
    .withMessage('id is missing from the parameters')
    .notEmpty()
    .withMessage('id is empty'),
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
  body('address2')
    .exists()
    .withMessage('Address 2 is missing from the body')
    .notEmpty()
    .withMessage('Address 2 is empty')
    .isString()
    .withMessage('Address 2 must be a string'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
