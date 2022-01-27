import createError from 'http-errors';

import db from '@/database';
import { Sequelize } from 'sequelize';
/**
 * POST /products
 * Add new product request
 */
export const createProduct = async (req, res, next) => {
  try {
    const {
      name, brandId, categoryId, count, photoURL, price,
    } = req.body;


    const productData = {
      name, count, categoryId, brandId, photoURL, rating: 0, price,
    };

    const product = await db.models.product.create(productData);

    return res.status(201).json({ success: 'true' });
  } catch (err) {
    return next(err);
  }
};
/**
 * GET /products
 * Get new product request
 */
export const getProducts = async (req, res, next) => {
  try {
    const { category: categoryId } = req.query;
    const where = {};
    if (categoryId) where.categoryId = categoryId;
    const products = await db.models.product.findAll({
      where,
      include: [{
        model: db.models.brand,
      }, {
        model: db.models.category,
      }],
    });

    return res.status(200).json(products);
  } catch (err) {
    return next(err);
  }
};
/**
 * Post
 * Set rating to product
 */
export const setRatingToProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const { userId, value } = req.body;

    const products = await db.models.userProductRating.create({ userId, productId, value });

    return res.status(200).json(products);
  } catch (err) {
    return next(err);
  }
};

export const getProductsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await db.models.product.findOne({
      where: {
        id,
      },
    });

    if (product) {
      const brand = await db.models.brand.findOne({
        where: {
          id: product.brandId,
        },
        attributes: [['title', 'brand']],
      });
      const category = await db.models.category.findOne({
        where: {
          id: product.categoryId,
        },
        attributes: [['title', 'category']],
      });

      // const rating = await db.models.userProductRating.findAll({
      //   where: {
      //     productId: product.id,
      //   },
      //   attributes: [
      //     [Sequelize.fn('AVG', Sequelize.col('value')), 'rating'],
      //   ],
      // });
      // const parseRating = Number.parseFloat(rating[0].dataValues.rating).toFixed(2);

      return res.status(200).json({
        ...product.dataValues, ...brand.dataValues, ...category.dataValues,
      });
    }
    return res.status(404).json({});
  } catch (err) {
    return next(err);
  }
};
