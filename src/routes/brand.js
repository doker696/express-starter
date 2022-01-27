import { Router } from 'express';
import * as brandController from '@/controllers/brand';

// import { isAuthenticated, validate } from '@/middleware';

const router = Router();

router.route('/')
  .get(brandController.getBrands)
  .post(brandController.createBrand);


export default router;
