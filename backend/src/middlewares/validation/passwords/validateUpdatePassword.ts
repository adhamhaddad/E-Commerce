import { Request, Response, NextFunction } from 'express';
import { check, body } from 'express-validator';
import { validate } from '../validationResult';

export const validateUpdatePassword = [
  check('id')
    .exists()
    .withMessage('id is missing from the parameters')
    .notEmpty()
    .withMessage('id is empty'),
  body('old_password')
    .exists()
    .withMessage('old_password is missing from the body')
    .notEmpty()
    .withMessage('old_password is empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('new_password')
    .exists()
    .withMessage('new_password is missing from the body')
    .notEmpty()
    .withMessage('new_password is empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
