const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return CumRap.init(sequelize, DataTypes);
}

class CumRap extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    CumRap_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Ten_Cum_Rap: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    Dia_Chi: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    HeThongRap_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'HeThongRap',
        key: 'HeThongRap_ID'
      }
    }
  }, {
    sequelize,
    tableName: 'CumRap',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CumRap_ID" },
        ]
      },
      {
        name: "HeThongRap_ID",
        using: "BTREE",
        fields: [
          { name: "HeThongRap_ID" },
        ]
      },
    ]
  });
  }
}
