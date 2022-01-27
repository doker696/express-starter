import createError from 'http-errors';

import db from '@/database';

// eslint-disable-next-line import/prefer-default-export
export const getCategories = async (req, res, next) => {
  try {
    const categories = await db.models.category.findAll();

    return res.status(200).json(categories);
  } catch (err) {
    return next(err);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const categories = await db.models.category.create({ ...req.body }, { fields: ['title'] });

    return res.status(201).json(categories);
  } catch (err) {
    return next(err);
  }
};
