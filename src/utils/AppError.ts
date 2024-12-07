class AppError extends Error {
    public statusCode: number;
    public isOperational: boolean;
    public status: string;  // New status property
    public stackTrace?: string;
  
    constructor(message: string, statusCode: number, error?: Error) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = true;
      this.status = statusCode < 400 ? 'success' : 'fail'; 
  
      if (error) {
        this.stackTrace = error.stack;
      } else {
        this.stackTrace = this.stack;
      }
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export default AppError;