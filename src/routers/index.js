const express = require('express');
const rootRouter = express.Router()
const UserRouter =require('./UserRouter');

rootRouter.use('/QuanLyNguoiDung',UserRouter)

module.exports=rootRouter