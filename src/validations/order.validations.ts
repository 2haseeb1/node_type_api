import { body } from 'express-validator';

export const orderValidationRules = {
  createOrder: [
    body('email')
      .isEmail()
      .withMessage('Email must be a valid email address'),
    body('car')
      .isMongoId()
      .withMessage('Car must be a valid MongoDB ObjectId'),
    body('quantity')
      .isInt({ min: 1 })
      .withMessage('Quantity must be a positive integer greater than 0'),
  ],
};
