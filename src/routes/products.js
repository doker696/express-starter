import { Router } from 'express';
import * as productController from '@/controllers/product';

import { isAuthenticated, validate } from '@/middleware';

const router = Router();

router.route('/')
  .get(productController.getProducts)
  .post(productController.createProduct)
  .put(productController.updateProduct);

router.route('/:id')
  .get(productController.getProductsById);

router.route('/rate/:id')
  .post(productController.setRatingToProduct);


export default router;
