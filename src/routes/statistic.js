import { Router } from 'express';
import * as statController from '@/controllers/statistic';


const router = Router();

router.route('/brand')
  .get(statController.ByBrand);

router.route('/category')
  .get(statController.ByCategory);


router.route('/byid')
  .get(statController.ById);


export default router;
