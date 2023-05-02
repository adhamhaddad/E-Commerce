import { Request, Response, NextFunction } from 'express';
import { check, body } from 'express-validator';
import { validate } from '../validationResult';

export const validateUpdateUser = [
  check('id')
    .exists()
    .withMessage('id is missing from the parameters')
    .notEmpty()
    .withMessage('id is empty'),
  body('first_name')
    .exists()
    .withMessage("first_name doesn't exists in the body.")
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
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
