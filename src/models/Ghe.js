const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Ghe.init(sequelize, DataTypes);
}

class Ghe extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    Ma_Ghe_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ten_ghe: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    loai_ghe: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Ma_Rap_Phim_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'RapPhim',
        key: 'Ma_Rap_Phim_ID'
      }
    }
  }, {
    sequelize,
    tableName: 'Ghe',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Ma_Ghe_ID" },
        ]
      },
      {
        name: "Ma_Rap_Phim_ID",
        using: "BTREE",
        fields: [
          { name: "Ma_Rap_Phim_ID" },
        ]
      },
    ]
  });
  }
}
