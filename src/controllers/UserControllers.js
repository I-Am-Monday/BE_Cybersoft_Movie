const sequelize = require("../models/index");
const initModels = require("../models/init-models");
const { successCode, errorCode, failCode } = require("../ulti/response");
const model = initModels(sequelize);
const bcrypt = require("bcrypt");
const registerUser = async (req, res) => {
  try {
    let { ho_ten, email, so_dt, mat_khau, loai_nguoi_dung } = req.body;

    // Validate required fields
    if (!ho_ten) return failCode(res, {}, "Họ tên là bắt buộc.");
    if (!email) return failCode(res, {}, "Email là bắt buộc.");
    if (!so_dt) return failCode(res, {}, "Số điện thoại là bắt buộc.");
    if (!loai_nguoi_dung)
      return failCode(res, {}, "Loại người dùng là bắt buộc.");
    if (!mat_khau) return failCode(res, {}, "Mật khẩu là bắt buộc.");

    // Validate email format
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return failCode(res, {}, "Sai cú pháp Email.");
    }

    // Check if email already exists
    let existingUser = await model.NguoiDung.findOne({ where: { email } });
    if (existingUser) {
      return failCode(res, {}, "Email đã được sử dụng!!!");
    }

    // Hash the password
    let hashedPassword = bcrypt.hashSync(mat_khau, 10);

    // Create new user
    let newUser = {
      ho_ten,
      email,
      so_dt,
      mat_khau: hashedPassword,
      loai_nguoi_dung,
    };
    await model.NguoiDung.create(newUser);

    // Return success response
    return successCode(res, newUser, "Đăng ký tài khoản thành công");
  } catch (err) {
    return errorCode(res, `Lỗi máy chủ nội bộ: ${err.message}`);
  }
};

const getUser =async (req, res) => {
  try {
    let { email, mat_khau } = req.body;

    if (!email) return failCode(res, {}, "Chưa điền Email");
    if (!mat_khau) return failCode(res, {}, "Chưa điền matkhau");

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return failCode(res, {}, "Sai cú pháp Email.");
    }

    let user= await model.NguoiDung.findOne({where:{email}})
    
    if(!user){
      return failCode(res, {}, "Email không tồn tại.");
    }

    let isPasswordValid= await bcrypt.compare(mat_khau,user.mat_khau)
    
    if(!isPasswordValid){
      return failCode(res, {}, "Mật Khẩu sai");
    }
    
    return successCode(res, user, 'Đăng nhập thành công');

  } catch (error) {
    return errorCode(res, `Lỗi máy chủ nội bộ: ${err.message}`);
  }
};

module.exports = {
  getUser,
  registerUser,
};
