import { DataTypes, Model } from 'sequelize';

export default function (sequelize) {
  class Product extends Model {
    static associate(models) {
      Product.belongsToMany(models.order, { through: 'OrderProduct' });

      Product.belongsToMany(models.characteristic, { through: 'productCharacteristic' });
      Product.belongsTo(models.brand);
      Product.belongsTo(models.category);

      Product.belongsToMany(models.user, { through: 'userProductRating' });
    }
  }

  Product.init({
    name: {
      type: DataTypes.STRING(140),
    },
    count: {
      type: DataTypes.INTEGER,
    },
    photoURL: {
      type: DataTypes.STRING(140),
    },
    rating: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
        max: 5,
      },
    },
    price: {
      type: DataTypes.INTEGER,
    },
  }, {
    modelName: 'product',
    sequelize,
  });

  // Product.addHook('afterCreate', async (instance) => {
  //   instance.createdAt = new Date();
  // });

  // Product.addHook('afterDestroy', async (instance) => {
  //   instance.deletedAt = new Date();
  // });

  // Product.bulkCreate([
  //   {
  //     name: 'X3 PRO', count: 5, categoryId: 2, brandId: 5, price: 22177,
  //   },
  //   {
  //     name: 'X3 NFC', count: 1, categoryId: 2, brandId: 5, price: 21312,
  //   },
  //   {
  //     name: '11 PRO', count: 8, categoryId: 2, brandId: 2, price: 74247,
  //   },
  //   {
  //     name: 'XL324MM', count: 3, categoryId: 1, brandId: 3, price: 92085,
  //   },
  //   {
  //     name: 'AS54MS', count: 5, categoryId: 3, brandId: 4, price: 80868,
  //   },
  //   {
  //     name: 'S5OR1', count: 5, categoryId: 1, brandId: 1, price: 27616,
  //   },
  //   {
  //     name: 'ERG12W', count: 5, categoryId: 3, brandId: 5, price: 65459,
  //   },
  //   {
  //     name: 'HT4SF', count: 5, categoryId: 1, brandId: 3, price: 82161,
  //   },
  //   {
  //     name: 'GRE2', count: 5, categoryId: 4, brandId: 5, price: 36151,
  //   },
  //   {
  //     name: '13MAX', count: 5, categoryId: 2, brandId: 1, price: 15265,
  //   },
  //   {
  //     name: 'GR43W', count: 5, categoryId: 2, brandId: 6, price: 72314,
  //   },
  //   {
  //     name: 'WE1FR', count: 5, categoryId: 3, brandId: 3, price: 67017,
  //   },
  //   {
  //     name: 'SD6WE', count: 5, categoryId: 2, brandId: 2, price: 11263,
  //   },
  //   {
  //     name: 'QWQ1A', count: 5, categoryId: 1, brandId: 6, price: 39797,
  //   },
  //   {
  //     name: 'ASFS1', count: 5, categoryId: 4, brandId: 3, price: 68269,
  //   },
  //   {
  //     name: 'BRS4E', count: 5, categoryId: 3, brandId: 2, price: 26593,
  //   },
  //   {
  //     name: 'EQ34', count: 5, categoryId: 4, brandId: 6, price: 30061,
  //   },
  //   {
  //     name: 'HRF4W', count: 5, categoryId: 3, brandId: 4, price: 17574,
  //   },
  //   {
  //     name: 'PGER1', count: 5, categoryId: 3, brandId: 2, price: 83011,
  //   },
  //   {
  //     name: 'WFDS3', count: 5, categoryId: 1, brandId: 1, price: 21660,
  //   },
  // ]);

  return Product;
}
