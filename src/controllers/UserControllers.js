const sequelize = require("../models/index");
const initModels = require("../models/init-models");
const { successCode, errorCode, failCode } = require("../ulti/response");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const model = initModels(sequelize);

// Đảm bảo privateKey được định nghĩa
const privateKey = process.env.JWT_PRIVATE_KEY || 'your-secret-key';

// Hàm để tạo JWT token
const generateToken = (data) => {
  const options = { expiresIn: "1h", algorithm: "HS256" }; // Cấu hình thuật toán HS256
  return jwt.sign(data, privateKey, options);
};

const registerUser = async (req, res) => {
  try {
    let { ho_ten, email, so_dt, mat_khau, loai_nguoi_dung } = req.body;

    // Validate required fields
    if (!ho_ten) return failCode(res, {}, "Họ tên là bắt buộc.");
    if (!email) return failCode(res, {}, "Email là bắt buộc.");
    if (!so_dt) return failCode(res, {}, "Số điện thoại là bắt buộc.");
    if (!loai_nguoi_dung) return failCode(res, {}, "Loại người dùng là bắt buộc.");
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
    if (err.message.includes("ECONNREFUSED") && err.message.includes("::1:3306")) {
      return errorCode(
        res,
        "Lỗi máy chủ nội bộ: Kết nối bị từ chối. Mở Services và tìm dịch vụ MySQL."
      );
    } else {
      return errorCode(res, `Lỗi máy chủ nội bộ: ${err.message}`);
    }
  }
};

const getUser = async (req, res) => {
  try {
    let { email, mat_khau } = req.body;

    // Validate required fields
    if (!email) return failCode(res, {}, "Chưa điền Email");
    if (!mat_khau) return failCode(res, {}, "Chưa điền mật khẩu");

    // Validate email format
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return failCode(res, {}, "Sai cú pháp Email.");
    }

    // Find user by email
    let user = await model.NguoiDung.findOne({ where: { email } });
    if (!user) {
      return failCode(res, {}, "Email không tồn tại.");
    }

    // Compare the hashed password
    let isPasswordValid = await bcrypt.compare(mat_khau, user.mat_khau);
    if (!isPasswordValid) {
      return failCode(res, {}, "Mật khẩu không đúng.");
    }

    // Generate access token
    const accessToken = generateToken({ user });

   
    return successCode(res, { accessToken }, "Đăng nhập thành công");
  } catch (error) {
    if (error.message.includes("ECONNREFUSED") && error.message.includes("::1:3306")) {
      return errorCode(
        res,
        "Lỗi máy chủ nội bộ: Kết nối bị từ chối. Mở Services và tìm dịch vụ MySQL."
      );
    } else {
      return errorCode(res, `Lỗi máy chủ nội bộ: ${error.message}`);
    }
  }
};

module.exports = {
  getUser,
  registerUser,
};
