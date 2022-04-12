import { Router } from 'express';
import * as characteristicController from '@/controllers/characteristic';
import { isAuthenticated, isAdmin } from '@/middleware';
// import { isAuthenticated, validate } from '@/middleware';

const router = Router();

router.route('/')
  .get(characteristicController.getCharacteristics);

router.route('/create')
  .post(characteristicController.createCharacteristic);

router.route('/set')
  .post(characteristicController.setCharacteristicToCategory);

router.route('/category/:id')
  .get(characteristicController.getCharacteristicsOfCategory);

router.route('/product/set')
  .post(characteristicController.setCharacteristicToProduct);

export default router;
