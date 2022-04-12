import { DataTypes, Model } from 'sequelize';

export default function (sequelize) {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.user);
      Order.belongsToMany(models.product, { through: 'OrderProduct' });
    }
  }

  Order.init({
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    adress: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    fio: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    modelName: 'order',
    sequelize,
  });

  return Order;
}
