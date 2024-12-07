import { Router } from 'express';
import { orderController } from './order.controller';
import { validateOrderInput } from '../../middleware/validate.order.input';

const orderRouter = Router();

orderRouter.post('/', validateOrderInput, orderController.createOrder);
orderRouter.get('/revenue', orderController.calculateRevenue);

export default orderRouter;
