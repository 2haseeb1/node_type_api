import { Request, Response, NextFunction } from 'express';
import { carService } from './car.service';

export const carController = {
  // Create a new car
  async createCar(req: Request, res: Response, next: NextFunction):Promise<void> {
    try {
      const carData = req.body;

      const newCar = await carService.createCar(carData);

      res.status(201).json({
        message: 'Car created successfully',
        success: true,
        data: newCar,
      });
    } catch (error) {
      next(error);
    }
  },

  // Get all cars
  async getCars(req: Request, res: Response, next: NextFunction):Promise<void> {
    try {
      const { searchTerm } = req.query;

      const cars = await carService.getCars(searchTerm as string);

      res.status(200).json({
        message: 'Cars retrieved successfully',
        success: true,
        data: cars,
      });
    } catch (error) {
      next(error);
    }
  },

  // Get a single car by ID
  async getSingleCar(req: Request, res: Response, next: NextFunction):Promise<void> {
    try {
      const { carId } = req.params;

      const car = await carService.getCarById(carId);

      if (!car) {
         res.status(404).json({
          message: 'Car not found',
          success: false,
         });
         return
      }

      res.status(200).json({
        message: 'Car retrieved successfully',
        success: true,
        data: car,
      });
    } catch (error) {
      next(error);
    }
  },

  // Update a car
  async updateCar(req: Request, res: Response, next: NextFunction):Promise<void> {
    try {
      const { carId } = req.params;
      const carData = req.body;

      const updatedCar = await carService.updateCar(carId, carData);

      if (!updatedCar) {
        res.status(404).json({
          message: 'Car not found',
          success: false,
        });
        return
      }

      res.status(200).json({
        message: 'Car updated successfully',
        success: true,
        data: updatedCar,
      });
    } catch (error) {
      next(error);
    }
  },

  // Delete a car
  async deleteCar(req: Request, res: Response, next: NextFunction):Promise<void> {
    try {
      const { carId } = req.params;

      const deletedCar = await carService.deleteCar(carId);

      if (!deletedCar) {
         res.status(404).json({
          message: 'Car not found',
          success: false,
         });
         return
      }

      res.status(200).json({
        message: 'Car deleted successfully',
        success: true,
        data: deletedCar,
      });
    } catch (error) {
      next(error);
    }
  },
};
