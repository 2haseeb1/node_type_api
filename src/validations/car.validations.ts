import { body } from 'express-validator';

export const carValidationRules = {
  createCar: [
    body('brand').isString().withMessage('Brand must be a string'),
    body('model').isString().withMessage('Model must be a string'),
    body('year')
      .isInt({ min: 1886 }) // The first car was invented in 1886
      .withMessage('Year must be a valid integer and at least 1886'),
    body('price')
      .isFloat({ min: 0 })
      .withMessage('Price must be a positive number'),
    body('category')
      .isIn(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'])
      .withMessage('Category must be one of Sedan, SUV, Truck, Coupe, or Convertible'),
    body('description').isString().withMessage('Description must be a string'),
    body('quantity')
      .isInt({ min: 0 })
      .withMessage('Quantity must be a non-negative integer'),
    body('inStock').isBoolean().withMessage('InStock must be a boolean'),
  ],

  updateCar: [
    body('brand').optional().isString().withMessage('Brand must be a string'),
    body('model').optional().isString().withMessage('Model must be a string'),
    body('year')
      .optional()
      .isInt({ min: 1886 })
      .withMessage('Year must be a valid integer and at least 1886'),
    body('price')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('Price must be a positive number'),
    body('category')
      .optional()
      .isIn(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'])
      .withMessage('Category must be one of Sedan, SUV, Truck, Coupe, or Convertible'),
    body('description')
      .optional()
      .isString()
      .withMessage('Description must be a string'),
    body('quantity')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Quantity must be a non-negative integer'),
    body('inStock')
      .optional()
      .isBoolean()
      .withMessage('InStock must be a boolean'),
  ],
};
