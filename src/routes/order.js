import { Router } from 'express';
import * as orderController from '@/controllers/order';

// import { isAuthenticated, validate } from '@/middleware';

const router = Router();

router.route('/')
  .get(orderController.getOrders);


router.route('/create')
  .post(orderController.createOrder);


export default router;
