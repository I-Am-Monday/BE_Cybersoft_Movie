const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Banner.init(sequelize, DataTypes);
}

class Banner extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    Banner_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Ma_Phim_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Phim',
        key: 'Ma_Phim_ID'
      }
    },
    Hinh_Anh: {
      type: DataTypes.STRING(250),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Banner',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Banner_ID" },
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
