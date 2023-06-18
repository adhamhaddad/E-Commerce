import { Request, Response, NextFunction } from 'express';
import { body, check } from 'express-validator';
import { validate } from '../validationResult';

export const validateUpdateCategory = [
  check('id')
    .exists()
    .withMessage('id is missing from the parameters')
    .notEmpty()
    .withMessage('id is empty'),
  body('name')
    .exists()
    .withMessage('name is missing from the body')
    .notEmpty()
    .withMessage('name is empty')
    .isString()
    .withMessage('name must be a string')
    .isLength({ min: 4, max: 50 })
    .withMessage('name must be at least 4 and maximum 50 letters'),
  body('slug')
    .exists()
    .withMessage('slug is missing from the body')
    .notEmpty()
    .withMessage('slug is empty')
    .isString()
    .withMessage('slug must be a string')
    .isLength({ min: 3, max: 50 })
    .withMessage('slug must be at least 3 and maximum 50 letters'),
  body('icon_url').custom((value, { req }) => {
    if (!req.file) {
      throw new Error('File is required');
    }
    return true;
  }),
  body('user_id')
  .exists()
  .withMessage('user_id is missing from the body')
  .notEmpty()
  .withMessage('user_id is empty')
  .isNumeric()
  .withMessage('user_id must be a number'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
