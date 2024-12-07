import Car from './car.model';

export const carService = {
  
  async createCar(carData: any) {
    return await Car.create(carData);
  },

 
  async getCars(searchTerm?: string) {
    const filter: Record<string, any> = {};

    if (searchTerm) {
      filter.$or = [
        { brand: { $regex: searchTerm, $options: 'i' } },
        { model: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
      ];
    }

    return await Car.find(filter);
  },


  async getCarById(carId: string) {
    return await Car.findById(carId);
  },


  async updateCar(carId: string, carData: any) {
    return await Car.findByIdAndUpdate(carId, carData, { new: true });
  },


  async deleteCar(carId: string) {
    return await Car.findByIdAndDelete(carId);
  },
};
