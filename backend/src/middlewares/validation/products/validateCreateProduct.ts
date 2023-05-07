import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validate } from '../validationResult';

export const validateCreateProduct = [
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
  body('product_desc')
    .exists()
    .withMessage('product_desc is missing from the body')
    .notEmpty()
    .withMessage('product_desc is empty')
    .isString()
    .withMessage('product_desc must be a string'),
  body('image_url').custom((value, { req }) => {
    if (!req.file) {
      throw new Error('File is required');
    }
    return true;
  }),
  body('category_id')
    .exists()
    .withMessage('category_id is missing from the body')
    .notEmpty()
    .withMessage('category_id is empty')
    .isNumeric()
    .withMessage('category_id must be a number'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
