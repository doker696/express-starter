import { DataTypes, Model } from 'sequelize';

export default function (sequelize) {
  class CharacterisicValue extends Model {
    static associate(models) {
      CharacterisicValue.belongsTo(models.characteristic);
    }
  }

  CharacterisicValue.init({
    value: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  }, {
    modelName: 'characteristicValue',
    sequelize,
  });


  return CharacterisicValue;
}
