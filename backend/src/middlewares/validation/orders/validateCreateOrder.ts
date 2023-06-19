import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validate } from '../validationResult';

export const validateCreateOrder = [
  body('user_id')
    .exists()
    .withMessage('user_id is missing from the body')
    .notEmpty()
    .withMessage('user_id is empty')
    .isNumeric()
    .withMessage('user_id must be a number'),
  body('items')
    .exists()
    .withMessage('items is missing from the body')
    .notEmpty()
    .withMessage('items is empty')
    .isArray()
    .withMessage('items must be an array'),
  body('shipment_address')
    .exists()
    .withMessage('shipment_address is missing from the body')
    .notEmpty()
    .withMessage('shipment_address is empty')
    .isString()
    .withMessage('shipment_address must be a string'),
  body('shipment_date')
    .exists()
    .withMessage('shipment_date is missing from the body')
    .notEmpty()
    .withMessage('shipment_date is empty')
    .isString()
    .withMessage('shipment_date must be a string'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
