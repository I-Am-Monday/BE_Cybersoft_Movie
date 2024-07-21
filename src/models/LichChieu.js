const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return LichChieu.init(sequelize, DataTypes);
}

class LichChieu extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    Ma_Lich_Chieu_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Ma_Rap_Phim_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'RapPhim',
        key: 'Ma_Rap_Phim_ID'
      }
    },
    Ma_Phim_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Phim',
        key: 'Ma_Phim_ID'
      }
    },
    ngay_gio_chieu: {
      type: DataTypes.DATE,
      allowNull: true
    },
    gia_ve: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'LichChieu',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Ma_Lich_Chieu_ID" },
        ]
      },
      {
        name: "Ma_Rap_Phim_ID",
        using: "BTREE",
        fields: [
          { name: "Ma_Rap_Phim_ID" },
        ]
      },
      {
        name: "Ma_Phim_ID",
        using: "BTREE",
        fields: [
          { name: "Ma_Phim_ID" },
        ]
      },
    ]
  });
  }
}
