import authRouter from '@/routes/auth';
import indexRouter from '@/routes/index';
import tweetRouter from '@/routes/tweet';
import productRouter from '@/routes/products';
import brandRouter from '@/routes/brand';
import categoryRouter from '@/routes/category';
import characteristicRouter from '@/routes/characteristic';
import orderRouter from '@/routes/order';
import statRouter from '@/routes/statistic';

export default function (app) {
  app.use('/', indexRouter);
  app.use('/auth', authRouter);
  app.use('/tweets', tweetRouter);
  app.use('/products', productRouter);
  app.use('/brand', brandRouter);
  app.use('/category', categoryRouter);
  app.use('/characteristic', characteristicRouter);
  app.use('/order', orderRouter);
  app.use('/stats', statRouter);
}
