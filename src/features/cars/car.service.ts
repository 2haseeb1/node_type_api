import Car from './car.model';

interface CarData {
  brand: string;
  model: string;
  year: number;
  price: number;
  category: string;
  description?: string;
  quantity: number;
  inStock: boolean;
}

// Type definition for filter in search
interface SearchFilter {
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
}

export const carService = {
  
  async createCar(carData: CarData) {
    return await Car.create(carData);
  },

  async getCars(searchTerm?: string) {
    const filter: SearchFilter = {};

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

  async updateCar(carId: string, carData: Partial<CarData>) {
    return await Car.findByIdAndUpdate(carId, carData, { new: true });
  },

  async deleteCar(carId: string) {
    return await Car.findByIdAndDelete(carId);
  },
};
