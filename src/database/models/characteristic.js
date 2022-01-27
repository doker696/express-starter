import { DataTypes, Model } from 'sequelize';

export default function (sequelize) {
  class Characterisic extends Model {
    static associate(models) {
      Characterisic.belongsToMany(models.category, { through: 'CategoryCharacteristic' });

      Characterisic.belongsToMany(models.product, { through: 'productCharacteristic' });

      Characterisic.hasMany(models.characteristicValue);
    }
  }

  Characterisic.init({
    title: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  }, {
    modelName: 'characteristic',
    sequelize,
  });


  return Characterisic;
}
