import { DataTypes, Model } from 'sequelize';

export default function (sequelize) {
  class Rating extends Model {
    static associate(models) {
      Rating.belongsTo(models.product);
    }
  }

  Rating.init({
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    modelName: 'rating',
    sequelize,
  });

  return Rating;
}
