const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return RapPhim.init(sequelize, DataTypes);
}

class RapPhim extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    Ma_Rap_Phim_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Ten_Rap: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    CumRap_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'CumRap',
        key: 'CumRap_ID'
      }
    }
  }, {
    sequelize,
    tableName: 'RapPhim',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Ma_Rap_Phim_ID" },
        ]
      },
      {
        name: "CumRap_ID",
        using: "BTREE",
        fields: [
          { name: "CumRap_ID" },
        ]
      },
    ]
  });
  }
}
