import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validate } from '../validationResult';

export const validateUpdatePassword = [
  body('old_password')
    .exists()
    .withMessage('Old Password is missing from the body')
    .notEmpty()
    .withMessage('Old Password is empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('new_password')
    .exists()
    .withMessage('New Password is missing from the body')
    .notEmpty()
    .withMessage('New Password is empty')
    .isLength({ min: 8 })
    .withMessage('New Password must be at least 8 characters long'),
  body('user_id')
    .exists()
    .withMessage('user_id is missing from the body')
    .notEmpty()
    .withMessage('user_id is empty')
    .isNumeric()
    .withMessage('user_id must be number'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
