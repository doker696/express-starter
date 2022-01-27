import { DataTypes, Model } from 'sequelize';

export default function (sequelize) {
  class ProductCharacteristic extends Model {}

  ProductCharacteristic.init({
    value: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    modelName: 'productCharacteristic',
    sequelize,
  });

  return ProductCharacteristic;
}
