import express, { Application, Request, Response } from 'express';
import carRouter from './features/cars/car.router';
import orderRouter from './features/orders/order.router';
import { errorHandler } from './middleware/errorHandler';

const app: Application = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/cars', carRouter);
app.use('/api/orders', orderRouter);


app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is running 🚀',
  });
});


app.use(errorHandler);

export default app;
