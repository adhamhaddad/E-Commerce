import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validate } from '../validationResult';

export const validateCreateSubCategory = [
  body('name')
    .withMessage("name does'nt exists in the body.")
    .notEmpty()
    .withMessage('name is empty')
    .isString()
    .withMessage('name must be a string'),
  // .isLength({ min: 4, max: 50 })
  // .withMessage('name must be at least 4 and maximum 50 letters'),
  body('slug')
    .exists()
    .withMessage("slug doesn't exists in the body.")
    .notEmpty()
    .withMessage('slug is empty')
    .isString()
    .withMessage('slug must be a string'),
  // .isLength({ min: 3, max: 50 })
  // .withMessage('slug must be at least 3 and maximum 50 letters'),
  body('category_id')
    .exists()
    .withMessage('category_id is missing from the body')
    .notEmpty()
    .withMessage('category_id is empty')
    .isNumeric()
    .withMessage('category_id must be a number'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
