import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validate } from '../validationResult';

export const validateCreateUser = [
  body('first_name')
    .exists()
    .withMessage("first_name does'nt exists in the body.")
    .notEmpty()
    .withMessage('first_name is empty')
    .isString()
    .withMessage('first_name must be a string')
    .isLength({ min: 5, max: 50 })
    .withMessage('first_name must be at least 5 and maximum 50 letters'),
  body('last_name')
    .exists()
    .withMessage("last_name doesn't exists in the body.")
    .notEmpty()
    .withMessage('last_name is empty')
    .isString()
    .withMessage('last_name must be a string')
    .isLength({ min: 5, max: 50 })
    .withMessage('last_name must be at least 5 and maximum 50 letters'),
  body('email')
    .exists()
    .withMessage('email is missing from the body')
    .notEmpty()
    .withMessage('email is empty')
    .isEmail()
    .withMessage('email is not valid')
    .normalizeEmail()
    .withMessage('email is not normalized'),
  body('password')
    .exists()
    .withMessage('password is missing from the body')
    .notEmpty()
    .withMessage('password is empty')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters long'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
