/**
 * 使用  mongoose 操作数据库
 */

const mongoose = require('mongoose')
const md5 = require('blueimp-md5')

mongoose.connect('mongodb://localhost:27017/ggzhipin_test')

const conn = mongoose.connection

conn.on('connected', () => {
  console.log('数据库连接成功')
})

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
  header: { type: String }
})

const UserModel = mongoose.model('user', userSchema)

// add
function test_save() {
  const userModel = new UserModel({username: 'sera', password: md5('123'), type: 'dashen'})
  userModel.save((err, data) => {
    if(err) console.log(err)
    else {
      console.log(data);
    }
  })
}
// test_save()

// find
function test_find() {
  UserModel.find({ _id: '5f47be2c4a57d4414d09de54' },(error, users) => {
    console.log('find()', error, users)
  })
  UserModel.findOne({ _id: '5f47be2c4a57d4414d09de54' }, (error, user) => {
    console.log('findOne()', error, user)
  })
}
// test_find()

// update
function test_update() {
  UserModel.findByIdAndUpdate({_id: '5f47be2c4a57d4414d09de54'}, {username: 'reta'}, (error, user) => {
    console.log('update()', error, user)
  })
}
// test_update()

// delete
function test_delete() {
  UserModel.findByIdAndDelete({_id: '5f47be2c4a57d4414d09de54'}, (error, user) => {
    console.log('delete()', error, user)
  })
}
// test_delete()


