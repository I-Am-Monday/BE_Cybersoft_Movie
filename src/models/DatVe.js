const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return DatVe.init(sequelize, DataTypes);
}

class DatVe extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    tai_khoan: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'NguoiDung',
        key: 'tai_khoan'
      }
    },
    Ma_Lich_Chieu_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'LichChieu',
        key: 'Ma_Lich_Chieu_ID'
      }
    },
    Ma_Ghe_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Ghe',
        key: 'Ma_Ghe_ID'
      }
    }
  }, {
    sequelize,
    tableName: 'DatVe',
    timestamps: false,
    indexes: [
      {
        name: "tai_khoan",
        using: "BTREE",
        fields: [
          { name: "tai_khoan" },
        ]
      },
      {
        name: "Ma_Lich_Chieu_ID",
        using: "BTREE",
        fields: [
          { name: "Ma_Lich_Chieu_ID" },
        ]
      },
      {
        name: "Ma_Ghe_ID",
        using: "BTREE",
        fields: [
          { name: "Ma_Ghe_ID" },
        ]
      },
    ]
  });
  }
}
