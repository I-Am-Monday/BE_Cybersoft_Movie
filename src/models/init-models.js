const DataTypes = require("sequelize").DataTypes;
const _Banner = require("./Banner");
const _CumRap = require("./CumRap");
const _Ghe = require("./Ghe");
const _HeThongRap = require("./HeThongRap");
const _LichChieu = require("./LichChieu");
const _NguoiDung = require("./NguoiDung");
const _Phim = require("./Phim");
const _RapPhim = require("./RapPhim");

function initModels(sequelize) {
  const Banner = _Banner(sequelize, DataTypes);
  const CumRap = _CumRap(sequelize, DataTypes);
  const Ghe = _Ghe(sequelize, DataTypes);
  const HeThongRap = _HeThongRap(sequelize, DataTypes);
  const LichChieu = _LichChieu(sequelize, DataTypes);
  const NguoiDung = _NguoiDung(sequelize, DataTypes);
  const Phim = _Phim(sequelize, DataTypes);
  const RapPhim = _RapPhim(sequelize, DataTypes);

  RapPhim.belongsTo(CumRap, { as: "CumRap", foreignKey: "CumRap_ID"});
  CumRap.hasMany(RapPhim, { as: "RapPhims", foreignKey: "CumRap_ID"});
  CumRap.belongsTo(HeThongRap, { as: "HeThongRap", foreignKey: "HeThongRap_ID"});
  HeThongRap.hasMany(CumRap, { as: "CumRaps", foreignKey: "HeThongRap_ID"});
  Banner.belongsTo(Phim, { as: "Ma_Phim", foreignKey: "Ma_Phim_ID"});
  Phim.hasMany(Banner, { as: "Banners", foreignKey: "Ma_Phim_ID"});
  LichChieu.belongsTo(Phim, { as: "Ma_Phim", foreignKey: "Ma_Phim_ID"});
  Phim.hasMany(LichChieu, { as: "LichChieus", foreignKey: "Ma_Phim_ID"});
  Ghe.belongsTo(RapPhim, { as: "Ma_Rap_Phim", foreignKey: "Ma_Rap_Phim_ID"});
  RapPhim.hasMany(Ghe, { as: "Ghes", foreignKey: "Ma_Rap_Phim_ID"});
  LichChieu.belongsTo(RapPhim, { as: "Ma_Rap_Phim", foreignKey: "Ma_Rap_Phim_ID"});
  RapPhim.hasMany(LichChieu, { as: "LichChieus", foreignKey: "Ma_Rap_Phim_ID"});

  return {
    Banner,
    CumRap,
    Ghe,
    HeThongRap,
    LichChieu,
    NguoiDung,
    Phim,
    RapPhim,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
