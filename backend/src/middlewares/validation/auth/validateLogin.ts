import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validate } from '../validationResult';

export const validateLogin = [
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
    .withMessage('Password is empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
