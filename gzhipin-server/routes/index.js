var express = require('express');
var router = express.Router();
const md5 = require("blueimp-md5")
const UserModel = require('../db/models').UserModel
const filter = {password:0,__v:0}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*/!*用户注册*!/
router.post("/register",function(req,res){
  // 拿到用户数据
  const {username,password} = req.body
  if(username==='admin'){
    res.send({code:1,msg:'此用户已存在'})
  }else {
    res.send({code:0,id:'abc',username,password})
  }
})*/
/*用户注册*/
router.post('/register',function(req,res){
  // 获取数据
  const {username,password,type} = req.body

  console.log(req.body)
  // 处理数据,保存数据，根据数据库查询数据是否存在，存在返回提示msg，不存在则保存数据
  UserModel.findOne({username},function(err,user){
    if(user) {
      res.send({code: 1, msg: '此用户已存在'})
    }else{
      new UserModel({username,password:md5(password),type}).save(function (error,user) {
        // 在cookies中持久化存储数据
        res.cookie('userid',user._id,{maxAge:1000*60*60*24*7})
        //保存数据
        res.send({code:0,data:{_id:user._id,username,type}}) // 返回的数据中不需要携带密码
      })
    }
  })

 // res.end('111111')
})

/*用户登录*/
router.post('/login',function(req,res){
  const {username,password} = req.body;
  console.log(req.body)

  // 根据username，password查询数据库得到uesr，如果不存在返回提示信息，存在返回user
  UserModel.findOne({username,password},filter,function(error,user){
    if(!user){
      res.send({code:1,msg:'用户或密码错误'})
    }else{
      res.cookie("userid",user._id,{maxAge:1000*60*60*24*7})
      res.send({code:0,data:user})
    }
  })
})

module.exports = router;
