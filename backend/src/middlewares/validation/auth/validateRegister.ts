import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validate } from '../validationResult';

export const validateRegister = [
  body('first_name')
    .exists()
    .withMessage("first_name does'nt exists in the body.")
    .notEmpty()
    .withMessage('first_name is empty')
    .isString()
    .isLength({ min: 5, max: 50 })
    .withMessage('first_name must be at least 5 and maximum 50 letters'),
  body('last_name')
    .exists()
    .withMessage("last_name does'nt exists in the body.")
    .notEmpty()
    .withMessage('last_name is empty')
    .isString()
    .isLength({ min: 5, max: 50 })
    .withMessage('last_name must be at least 5 and maximum 50 letters'),
  body('email')
    .exists()
    .withMessage('Email is missing from the body')
    .notEmpty()
    .withMessage('Email is empty')
    .isEmail()
    .withMessage('Email is not valid')
    .normalizeEmail()
    .withMessage('Email is not normalized'),
  body('password')
    .exists()
    .withMessage('Password is missing from the body')
    .notEmpty()
    .withMessage('Email is empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
