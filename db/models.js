/*
 包含 多个操作数据库集合数据的Model模块
 */

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/ggzhipin')

const conn = mongoose.connection

conn.on('connected', () => {
  console.log('db connect success！')
})

const userSchema = mongoose.Schema({
  username: { type: String, required: true }, // 用户名
  password: { type: String, required: true }, // 密码
  type: { type: String, required: true }, // 用户类型
  header: { type: String }, // 头像
  post: { type: String }, // 职位
  info: { type: String }, // 个人或者职位简介
  company: { type: String }, // 公司
  salary: { type: String } // 工资
})

const userModel = mongoose.model('user', userSchema)

exports.userModel = userModel
