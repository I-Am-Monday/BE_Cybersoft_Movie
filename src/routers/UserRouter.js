const express = require('express');
const { getUser,registerUser } = require('../controllers/UserControllers');
const UserRouter = express.Router();


UserRouter.post('/DangNhap', getUser);
UserRouter.post('/DangKy', registerUser);

module.exports = UserRouter;
