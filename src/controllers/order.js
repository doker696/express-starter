import createError from 'http-errors';
import { Op } from 'sequelize';
import db from '@/database';

// eslint-disable-next-line import/prefer-default-export
export const getOrders = async (req, res, next) => {
  try {
    const dateFrom = req.query.from;
    const dateTo = req.query.to;
    const categoryId = req.query.category;
    const where = { };
    const whereProd = { };
    if (dateFrom) {
      where.date = { ...where.date, [Op.gte]: dateFrom };
    }
    if (dateTo) {
      where.date = { ...where.date, [Op.lte]: dateTo };
    }
    if (categoryId) {
      whereProd.categoryId = categoryId;
    }

    const orders = await db.models.order.findAll({
      where,
      include: [{ model: db.models.product, where: whereProd }],
    });

    return res.status(200).json(orders);
  } catch (err) {
    return next(err);
  }
};
// eslint-disable-next-line import/prefer-default-export
export const createOrder = async (req, res, next) => {
  try {
    const { userId, productsIds, date } = req.body;

    const order = await db.models.order.create({ userId, date });

    const orderProduct = await db.models.OrderProduct.bulkCreate(productsIds.map((id) => ({ orderId: order.id, productId: id })));

    return res.status(200).json(orderProduct);
  } catch (err) {
    return next(err);
  }
};
