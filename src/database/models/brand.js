import { DataTypes, Model } from 'sequelize';

export default function (sequelize) {
  class Brand extends Model {
    static associate(models) {
      Brand.hasMany(models.product, { foreignKey: 'brandId' });
    }
  }

  Brand.init({
    title: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  }, {
    modelName: 'brand',
    sequelize,
  });

  return Brand;
}
