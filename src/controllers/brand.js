import createError from 'http-errors';

import db from '@/database';

// eslint-disable-next-line import/prefer-default-export
export const getBrands = async (req, res, next) => {
  try {
    const brands = await db.models.brand.findAll({
      attributes: ['id', 'title'],
    });
    console.log(brands);
    return res.status(200).json(brands);
  } catch (err) {
    return next(err);
  }
};

export const createBrand = async (req, res, next) => {
  try {
    console.log(req.body);
    const brand = await db.models.brand.create({ ...req.body }, { fields: ['title'] });

    return res.status(201).json(brand);
  } catch (err) {
    return next(err);
  }
};
