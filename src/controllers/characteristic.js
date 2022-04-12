import db from '@/database';

export const getCharacteristicsOfCategory = async (req, res, next) => {
  try {
    const characteristics = await db.models.CategoryCharacteristic.findAll({
      where: {
        categoryId: req.params.id,
      },
    });

    return res.status(201).json(characteristics);
  } catch (error) {
    return next(error);
  }
};

export const createCharacteristic = async (req, res, next) => {
  try {
    const { title } = req.body;
    const characteristics = await db.models.characteristic.create({ title }, { fields: ['title'] });

    return res.status(201).json(characteristics);
  } catch (error) {
    return next(error);
  }
};

export const setCharacteristicToCategory = async (req, res, next) => {
  try {
    const { categoryId, characteristicId } = req.body;
    const characteristics = await db.models.CategoryCharacteristic.create(
      { categoryId, characteristicId },
      { fields: ['categoryId', 'characteristicId'] },
    );

    return res.status(201).json(characteristics);
  } catch (error) {
    return next(error);
  }
};

export const setCharacteristicToProduct = async (req, res, next) => {
  try {
    const { productId, characteristicId, value } = req.body;
    const data = await db.models.productCharacteristic.create(
      { productId, characteristicId, value },
    );

    return res.status(201).json(data);
  } catch (error) {
    return next(error);
  }
};

export const getCharacteristics = async (req, res, next) => {
  try {
    const characteristics = await db.models.characteristic.findAll({ where: { deletedAt: null } });

    return res.status(200).json(characteristics);
  } catch (error) {
    return next(error);
  }
};
