import { Router } from 'express';
import { carController } from './car.controller';
import { carValidationRules } from '../../validations/car.validations';
import { validateCarInput } from '../../middleware/validate.car.input';
import { validateCarUpdateInput } from '../../middleware/validate.car.update.input';


const carRouter = Router();

carRouter.post(
  '/',
  carValidationRules.createCar,
  validateCarInput,
  carController.createCar
);

carRouter.get('/', carController.getCars);
carRouter.get('/:carId', carController.getSingleCar);
carRouter.put(
  '/:carId',
  carValidationRules.updateCar,validateCarUpdateInput,
 
  carController.updateCar
);

carRouter.delete('/:carId', carController.deleteCar);

export default carRouter;
