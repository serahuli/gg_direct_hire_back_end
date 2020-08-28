var express = require('express');
var router = express.Router();
const md5 = require('blueimp-md5')

const UserModel = require('../db/models').userModel
const filter = { password: 0, __v: 0 }

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 注册路由，用户注册
/*
  a) path 为: /register
  b) 请求方式为: POST
  c) 接收 username 和 password 参数
  d) admin 是已注册用户
  e) 注册成功返回: {code: 0, data: {_id: 'abc', username: ‘xxx’, password:’123’}
  f) 注册失败返回: {code: 1, msg: '此用户已存在'}
 */
/*
  1. 获取请求参数
  2. 处理
  3. 返回响应数据
 */

// 注册
router.post('/register', (req, res) => {
  const { username, password, type } = req.body
  // 处理
  UserModel.findOne({ username }, (error, data) => {
    if(data) {
      res.send({
        code: 1,
        msg: '此用户名字已存在'
      })
    } else {
      new UserModel({ username, type, password: md5(password) }).save((error, data) => {
        res.cookie('userid', data._id, { maxAge: 1000 * 60 * 60 * 24 } )
        const user = { username, type, _id: data._id }
        res.send({ code: 0, data: user })
      })
    }
  })
})

// 登录
router.post('/login', (req, res) => {
  const { username, password } = req.body

  UserModel.findOne({ username, password: md5(password) }, filter, (error, user) => {
    if(user) {
      res.cookie('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 })
      res.send({ code: 0, msg: '登陆成功', data: user })
    } else {
      UserModel.findOne({ username }, (error, user) => {
        if(user) {
          res.send({ code: 1, msg: '用户名或者密码错误' })
        } else {
          res.send({ code: 1, msg: '用户不存在' })
        }
      })
    }
  })

})


module.exports = router;
