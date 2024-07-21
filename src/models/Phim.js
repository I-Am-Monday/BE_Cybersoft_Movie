const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Phim.init(sequelize, DataTypes);
}

class Phim extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    Ma_Phim_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Ten_Phim: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    trailer: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    hinh_anh: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    mo_ta: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ngay_khoi_chieu: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    danh_gia: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hot: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    dang_chieu: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    sap_chieu: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Phim',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Ma_Phim_ID" },
        ]
      },
    ]
  });
  }
}
