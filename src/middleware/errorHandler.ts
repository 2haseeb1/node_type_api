import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number; 
  details?: Record<string, unknown>;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  void _next; // Properly acknowledge that _next is unused
  
  const statusCode = err.statusCode || 500; 
  const message = err.message || 'Internal Server Error';

  const errorResponse = {
    message,
    success: false,
    error: {
      name: err.name || 'Error',
      errors: err.details || {}, 
    },
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack, 
  };

  res.status(statusCode).json(errorResponse);
};
