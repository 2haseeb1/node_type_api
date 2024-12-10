import { Router } from 'express';
import { carController } from './car.controller';
import { carInputValidator } from '../../validations/car.updated.validations'; 
import { validateCarPostInput } from '../../middleware/validate.car.post';
 

const carRouter = Router();


carRouter.post('/', validateCarPostInput, carController.createCar);


carRouter.get('/', carController.getCars);


carRouter.get('/:carId', carController.getSingleCar);


carRouter.put('/:carId', carInputValidator, carController.updateCar);


carRouter.delete('/:carId', carController.deleteCar);

export default carRouter;
