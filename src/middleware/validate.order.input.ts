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

export const validateOrderInput = (req: Request, res: Response, next: NextFunction): void => {
  const errors: Record<string, ValidationError> = {}; // Replace 'any' with the 'ValidationError' interface

  const { email, car, quantity } = req.body;

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
    errors.email = {
      message: 'Email is required and must be a valid email address with at least 2 characters after the dot.',
      name: 'ValidatorError',
      properties: {
        message: 'Email is required and must be a valid email address with at least 2 characters after the dot.',
        type: 'string',
      },
      kind: 'string',
      path: 'email',
      value: email || null,
    };
  }

  // Car ObjectId validation
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  if (!car || typeof car !== 'string' || !objectIdRegex.test(car)) {
    errors.car = {
      message: 'Car is required and must be a valid ObjectId.',
      name: 'ValidatorError',
      properties: {
        message: 'Car is required and must be a valid ObjectId.',
        type: 'string',
      },
      kind: 'string',
      path: 'car',
      value: car || null,
    };
  }

 
  if (!quantity || typeof quantity !== 'number' || quantity <= 0) {
    errors.quantity = {
      message: 'Quantity must be a positive number.',
      name: 'ValidatorError',
      properties: {
        message: 'Quantity must be a positive number.',
        type: 'min',
        min: 1,
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
