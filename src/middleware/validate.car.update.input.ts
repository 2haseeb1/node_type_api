import { Request, Response, NextFunction } from 'express';

interface ValidationError {
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

export const validateCarUpdateInput = (req: Request, res: Response, next: NextFunction): void => {
  const errors: Record<string, ValidationError> = {}; 
  const { price, quantity, category } = req.body; 
  if (price !== undefined && (typeof price !== 'number' || price <= 0)) {
    errors.price = {
      message: 'Price must be a positive number.',
      name: 'ValidatorError',
      properties: {
        message: 'Price must be a positive number.',
        type: 'min',
        min: 0,
      },
      kind: 'min',
      path: 'price',
      value: price || null,
    };
  }


  const validCategories = ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'];
  if (category !== undefined && !validCategories.includes(category)) {
    errors.category = {
      message: `Category must be one of ${validCategories.join(', ')}.`,
      name: 'ValidatorError',
      properties: {
        message: `Category must be one of ${validCategories.join(', ')}.`,
        type: 'enum',
      },
      kind: 'enum',
      path: 'category',
      value: category || null,
    };
  }

  if (quantity !== undefined && (typeof quantity !== 'number' || quantity < 0)) {
    errors.quantity = {
      message: 'Quantity must be a non-negative number.',
      name: 'ValidatorError',
      properties: {
        message: 'Quantity must be a non-negative number.',
        type: 'min',
        min: 0,
      },
      kind: 'min',
      path: 'quantity',
      value: quantity || null,
    };
  }


  if (Object.keys(errors).length > 0) {
    res.status(400).json({
      message: 'Validation failed',
      success: false,
      error: {
        name: 'ValidationError',
        errors,
      },
      stack: process.env.NODE_ENV === 'production' ? undefined : new Error().stack,
    });
    return;
  }

 
  next();
};
