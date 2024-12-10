import { Request, Response, NextFunction } from 'express';

interface CarValidationError {
  message: string;
  name: string;
  properties: {
    message: string;
    type: string;
    min?: number;
  };
  kind: string;
  path: string;
  value: unknown;
}


const VALID_CAR_CATEGORIES = ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'];

export const carInputValidator = (req: Request, res: Response, next: NextFunction): void => {
  const validationErrors: Record<string, CarValidationError> = {};

  const { brand, model, year, price, category, description, quantity, inStock } = req.body;

  // Validate brand
  if (typeof brand !== 'string') {
    validationErrors.brand = {
      message: 'Brand must be a string',
      name: 'CarValidatorError',
      properties: {
        message: 'Brand must be a string',
        type: 'string',
      },
      kind: 'string',
      path: 'brand',
      value: brand,
    };
  }

 
  if (typeof model !== 'string') {
    validationErrors.model = {
      message: 'Model must be a string',
      name: 'CarValidatorError',
      properties: {
        message: 'Model must be a string',
        type: 'string',
      },
      kind: 'string',
      path: 'model',
      value: model,
    };
  }

  if (typeof year !== 'number' || year < 1886) {
    validationErrors.year = {
      message: 'Year must be a valid integer and at least 1886',
      name: 'CarValidatorError',
      properties: {
        message: 'Year must be a valid integer and at least 1886',
        type: 'min',
        min: 1886,
      },
      kind: 'min',
      path: 'year',
      value: year,
    };
  }

  // Validate price
  if (typeof price !== 'number' || price <= 0) {
    validationErrors.price = {
      message: 'Price must be a positive number',
      name: 'CarValidatorError',
      properties: {
        message: 'Price must be a positive number',
        type: 'min',
        min: 0,
      },
      kind: 'min',
      path: 'price',
      value: price,
    };
  }

  // Validate category
  if (!VALID_CAR_CATEGORIES.includes(category)) {
    validationErrors.category = {
      message: `Category must be one of ${VALID_CAR_CATEGORIES.join(', ')}.`,
      name: 'CarValidatorError',
      properties: {
        message: `Category must be one of ${VALID_CAR_CATEGORIES.join(', ')}.`,
        type: 'enum',
      },
      kind: 'enum',
      path: 'category',
      value: category,
    };
  }

  // Validate description
  if (typeof description !== 'string') {
    validationErrors.description = {
      message: 'Description must be a string',
      name: 'CarValidatorError',
      properties: {
        message: 'Description must be a string',
        type: 'string',
      },
      kind: 'string',
      path: 'description',
      value: description,
    };
  }

  // Validate quantity
  if (typeof quantity !== 'number' || quantity < 0) {
    validationErrors.quantity = {
      message: 'Quantity must be a non-negative integer',
      name: 'CarValidatorError',
      properties: {
        message: 'Quantity must be a non-negative integer',
        type: 'min',
        min: 0,
      },
      kind: 'min',
      path: 'quantity',
      value: quantity,
    };
  }

  
  if (typeof inStock !== 'boolean') {
    validationErrors.inStock = {
      message: 'InStock must be a boolean',
      name: 'CarValidatorError',
      properties: {
        message: 'InStock must be a boolean',
        type: 'boolean',
      },
      kind: 'boolean',
      path: 'inStock',
      value: inStock,
    };
  }

 
  if (Object.keys(validationErrors).length > 0) {
    res.status(400).json({
      message: 'Validation failed',
      success: false,
      error: {
        name: 'ValidationError',
        details: validationErrors,
      },
      stack: process.env.NODE_ENV === 'production' ? undefined : new Error().stack,
    });
    return;
  }

 
  next();
};
