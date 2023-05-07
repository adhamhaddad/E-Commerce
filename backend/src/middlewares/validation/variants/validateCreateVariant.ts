import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validate } from '../validationResult';

export const validateCreateVariant = [
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
  body('price')
    .exists()
    .withMessage('price is missing from the body')
    .notEmpty()
    .withMessage('price is empty')
    .isNumeric()
    .withMessage('price must be a number'),
  body('quantity')
    .exists()
    .withMessage('quantity is missing from the body')
    .notEmpty()
    .withMessage('quantity is empty')
    .isNumeric()
    .withMessage('quantity must be a number'),
  body('product_id')
    .exists()
    .withMessage('product_id is missing from the body')
    .notEmpty()
    .withMessage('product_id is empty')
    .isNumeric()
    .withMessage('product_id must be a number'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
