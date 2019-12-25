const md5 = require('blueimp-md5')
/*1.引入mongoose*/
const mongoose = require('mongoose');
/*2.连接指定数据库*/
mongoose.connect('mongodb://localhost:27017/gzhipin_test2',{ useNewUrlParser: true, useUnifiedTopology: true})
/*3.获取连接对象*/
const conn = mongoose.connection;
/*4. 绑定连接，完成监听*/
conn.on('connected', function(){
    console.log('数据库连接成功')
})

/*得到对应的集合modal*/
const userSchema = mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    type:{type:String,required:true},
})

//定义modal（与集合对应，可以操作modal）
const UserModel = mongoose.model('user',userSchema)   //集合名：users

//通过model实例的save（）添加数据
function testSave(){
    const user={
        username:'Jack',
        password:md5(123),
        type:'dashen'
    }
    const userModel = new UserModel(user);
    userModel.save(function (err,user) {
        console.log('save',err,user)
    })
}
//testSave()
// 查询数据
function testFind() {
    UserModel.find(function (error,users) {
        console.log('find()',error,users)
    })
}
//testFind()
// 查询一条数据
function testFindOne() {
    UserModel.findOne({_id:'5e0056e3d27f682f8c0c77b3'},function (error,user) {
        console.log('FindOne()',error,user)
    })
}
//testFindOne()
// 更新数据
function testUpdate() {
    UserModel.findByIdAndUpdate({_id:'5e0056e3d27f682f8c0c77b3'},{username:'tom111'},function (error,user) {
        console.log('update',error,user)
    })
}
testUpdate()