import { DataTypes, Model, Sequelize } from 'sequelize';

export default function (sequelize) {
  class UserProductRating extends Model {}

  UserProductRating.init({
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    modelName: 'userProductRating',
    sequelize,
  });

  UserProductRating.addHook('afterCreate', async (instance) => {
    const avgRating = await sequelize.models.userProductRating.findAll({
      where: {
        productId: instance.productId,
      },
      attributes: [
        [Sequelize.fn('AVG', Sequelize.col('value')), 'rating'],
      ],
    });
    const parseRating = Number.parseFloat(avgRating[0].dataValues.rating).toFixed(2);
    await sequelize.models.product.update({ rating: parseRating }, { where: { id: instance.productId } });
  });

  return UserProductRating;
}
