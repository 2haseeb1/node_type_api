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

export const validateCarInput = (req: Request, res: Response, next: NextFunction): void => {
  const errors: Record<string, ValidationError> = {}; 

  const { brand, model, year, price, category, description, quantity, inStock } = req.body;

  
  if (!brand || typeof brand !== 'string') {
    errors.brand = {
      message: 'Brand is required and must be a string.',
      name: 'ValidatorError',
      properties: {
        message: 'Brand is required and must be a string.',
        type: 'string',
      },
      kind: 'string',
      path: 'brand',
      value: brand || null,
    };
  }

 
  if (!model || typeof model !== 'string') {
    errors.model = {
      message: 'Model is required and must be a string.',
      name: 'ValidatorError',
      properties: {
        message: 'Model is required and must be a string.',
        type: 'string',
      },
      kind: 'string',
      path: 'model',
      value: model || null,
    };
  }


  if (!year || typeof year !== 'number' || year < 1886) {
    errors.year = {
      message: 'Year must be a valid number (greater than or equal to 1886).',
      name: 'ValidatorError',
      properties: {
        message: 'Year must be a valid number (greater than or equal to 1886).',
        type: 'min',
        min: 1886,
      },
      kind: 'min',
      path: 'year',
      value: year || null,
    };
  }

 
  if (!price || typeof price !== 'number' || price <= 0) {
    errors.price = {
      message: 'Valid Price is required.',
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
  if (!category || !validCategories.includes(category)) {
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


  if (!description || typeof description !== 'string') {
    errors.description = {
      message: 'Description is required and must be a string.',
      name: 'ValidatorError',
      properties: {
        message: 'Description is required and must be a string.',
        type: 'string',
      },
      kind: 'string',
      path: 'description',
      value: description || null,
    };
  }

 
  if (!quantity || typeof quantity !== 'number' || quantity < 0) {
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


  if (typeof inStock !== 'boolean') {
    errors.inStock = {
      message: 'InStock must be a boolean.',
      name: 'ValidatorError',
      properties: {
        message: 'InStock must be a boolean.',
        type: 'boolean',
      },
      kind: 'boolean',
      path: 'inStock',
      value: inStock || null,
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
