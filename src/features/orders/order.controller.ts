import { Request, Response, NextFunction } from 'express';
import { orderService } from './order.service';

export const orderController = {
  // Create a new order
  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, car, quantity } = req.body;

      const newOrder = await orderService.createOrder(email, car, quantity);

      res.status(201).json({
        message: 'Order created successfully',
        status: true,
        data: newOrder,
      });
    } catch (error) {
      next(error);
    }
  },

  // Calculate total revenue
  async calculateRevenue(req: Request, res: Response, next: NextFunction) {
    try {
      const totalRevenue = await orderService.calculateRevenue();

      res.status(200).json({
        message: 'Revenue calculated successfully',
        status: true,
        data: { totalRevenue },
      });
    } catch (error) {
      next(error);
    }
  },
};
