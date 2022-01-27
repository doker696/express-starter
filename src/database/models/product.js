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
      allowNull: false,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

  return Product;
}
