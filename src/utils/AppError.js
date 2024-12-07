"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(message, statusCode, error) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        this.status = statusCode < 400 ? 'success' : 'fail';
        if (error) {
            this.stackTrace = error.stack;
        }
        else {
            this.stackTrace = this.stack;
        }
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AppError;
