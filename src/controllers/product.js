import db from '@/database';
import { Sequelize } from 'sequelize';

/**
 * POST /products
 * Add new product request
 */
export const createProduct = async (req, res, next) => {
  try {
    const {
      name, brandId, categoryId, count, photoURL, price, characteristics,
    } = req.body;

    const productData = {
      name,
      count,
      categoryId,
      brandId,
      photoURL,
      rating: 0,
      price,
    };

    const product = await db.models.product.create(productData);
    if (product) {
      const t = await db.models.productCharacteristic.bulkCreate(
        characteristics.map((el) => ({ value: el.value, productId: product.id, characteristicId: el.id })),
      );
    }
    return res.status(200).json({ success: 'true' });
  } catch (err) {
    return res.status(200).json({ success: 'true' });
  }
};

/**
 * PUT /products
 * Update product request
 */
export const updateProduct = async (req, res, next) => {
  try {
    const {
      productId, name, brandId, count, photoURL, price, characteristics,
    } = req.body;

    const productData = {
      name,
      count,
      brandId,
      photoURL,
      price,
    };

    const product = await db.models.product.update(productData, { where: { id: productId } });

    if (product.length && characteristics.length) {
      const t = await db.models.productCharacteristic.bulkCreate(
        characteristics.map((el) => ({ value: el.value, productId, characteristicId: el.id })),
        { updateOnDuplicate: ['value'] },
      );
    }

    return res.status(201).json({ success: 'true' });
  } catch (err) {
    return next(err);
  }
};
/**
 * GET /products
 * Get products request
 */
export const getProducts = async (req, res, next) => {
  try {
    const { category: categoryId, sort } = req.query;
    const where = {};
    const order = [];
    if (categoryId) where.categoryId = categoryId;
    switch (sort) {
      case 'rating':
        order.push(['rating', 'DESC']);
        break;
      case 'sellCount':
        const result = await db.query(
          'select case when o."count" is null then 0 else o."count" end as "productCount", * from "products" left join (select "OrderProduct"."productId", count(*) from "OrderProduct" group by "OrderProduct"."productId") o on o."productId" = "products".id order by  "productCount" DESC',
        );
        return res.status(200).json(result[0]);

      case 'popular':
        const result2 = await db.query(
          'select case when o."count" is null then 0 else o."count" end as "productCount", * from "products" left join (select "OrderProduct"."productId",count("OrderProduct"."productId") from "OrderProduct" where date_trunc(\'month\', CURRENT_DATE) = date_trunc(\'month\', "OrderProduct"."createdAt") group by "OrderProduct"."productId") o on o."productId" = "products".id order by "productCount" DESC',
        );
        return res.status(200).json(result2[0]);
      default:
        break;
    }
    const products = await db.models.product.findAll({
      where,
      order,
      include: [
        {
          model: db.models.brand,
        },
        {
          model: db.models.category,
        },
      ],
    });

    return res.status(200).json(products);
  } catch (err) {
    return next(err);
  }
};

/**
 * Post /rate/:id
 * Set rating to product
 */
export const setRatingToProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const { userId, value } = req.body;
    const rat = await db.models.userProductRating.findOne({ where: { userId, productId } });
    let products;

    if (rat) {
      products = await db.models.userProductRating.update(
        { value },
        {
          where: {
            userId,
            productId,
          },
        },
      );
    } else {
      products = await db.models.userProductRating.create({ userId, productId, value });
    }
    const allRating = await db.models.userProductRating.findAndCountAll({
      where: {
        productId,
      },
    });
    const avgRating = allRating.rows.reduce((acc, row) => acc + row.value, 0) / allRating.count;
    await db.models.product.update({ rating: avgRating }, { where: { id: productId } });
    return res.status(200).json({});
  } catch (err) {
    return next(err);
  }
};

/**
 * GET /:id
 * Get product by id
 */
export const getProductsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await db.models.product.findOne({
      where: {
        id,
      },
      include: [db.models.characteristic],
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

      const stats = await db.models.OrderProduct.findAndCountAll({
        where: {
          productId: id,
        },
      });

      return res.status(200).json({
        ...product.dataValues,
        ...brand.dataValues,
        ...category.dataValues,
        stats,
      });
    }
    return res.status(404).json({});
  } catch (err) {
    return next(err);
  }
};
