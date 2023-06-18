import { Request, Response, NextFunction } from 'express';
import { check, body } from 'express-validator';
import { validate } from '../validationResult';

export const validateUpdateProduct = [
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
    .isLength({ min: 4, max: 100 })
    .withMessage('name must be at least 4 and maximum 100 letters'),
  body('slug')
    .exists()
    .withMessage('slug is missing from the body')
    .notEmpty()
    .withMessage('slug is empty')
    .isString()
    .withMessage('slug must be a string')
    .isLength({ min: 3, max: 100 })
    .withMessage('slug must be at least 3 and maximum 100 letters'),
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
  body('price')
    .exists()
    .withMessage('price is missing from the body')
    .notEmpty()
    .withMessage('price is empty'),
  body('quantity')
    .exists()
    .withMessage('quantity is missing from the body')
    .notEmpty()
    .withMessage('quantity is empty'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
