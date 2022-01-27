import { Router } from 'express';
import * as categoryController from '@/controllers/category';
import { isAuthenticated, isAdmin } from '@/middleware';
// import { isAuthenticated, validate } from '@/middleware';

const router = Router();

router.route('/')
  .get(categoryController.getCategories)
  .post(isAuthenticated, isAdmin, categoryController.createCategory);

export default router;
