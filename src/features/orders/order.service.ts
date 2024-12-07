import Order from './order.model';
import Car from '../cars/car.model';
import { IOrder } from './order.interface';

export const orderService = {
  // Create a new order
  async createOrder(email: string, carId: string, quantity: number): Promise<IOrder> {
    const car = await Car.findById(carId);

    if (!car) {
      throw new Error('Car not found');
    }

    if (car.quantity < quantity) {
      throw new Error('Insufficient stock');
    }

    const totalPrice = car.price * quantity;

    const newOrder = new Order({
      email,
      car: car._id,
      quantity,
      totalPrice,
    });

    await newOrder.save();

    // Update car inventory
    car.quantity -= quantity;
    if (car.quantity === 0) {
      car.inStock = false;
    }

    await car.save();

    return newOrder;
  },

  // Calculate total revenue
  async calculateRevenue(): Promise<number> {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' },
        },
      },
    ]);

    return result.length > 0 ? result[0].totalRevenue : 0;
  },
};
