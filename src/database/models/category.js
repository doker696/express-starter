import { DataTypes, Model } from 'sequelize';

export default function (sequelize) {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.product, { foreignKey: 'categoryId' });
      Category.belongsToMany(models.characteristic, { through: 'CategoryCharacteristic' });
    }
  }

  Category.init({
    title: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  }, {
    modelName: 'category',
    sequelize,
  });

  return Category;
}
