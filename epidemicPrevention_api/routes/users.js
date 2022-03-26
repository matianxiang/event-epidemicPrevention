var express = require('express');
var router = express.Router();
const user = require('../dao/users_dao')  //导入user_dao这个类
const fileUp = require('../utils/fileUtils')
const jwtUtils = require('../utils/jwtUtils')
const config = require('../config')
//注意一定要用const
const jwtSecretKey = config.jwtSecretKey

String.prototype.isPicture = function(){
    let strFilter = '.jpeg|.gif|.jpg|.png|.webp|.svg|.bmp'
    //找到.的位置
    if(this.indexOf('.')>-1){
          let p = this.lastIndexOf('.')
          // this.substring(p.this.length) 截取后缀名
          let strPostfix = this.substring(p,this.length)+'|'
          strPostfix = strPostfix.toLowerCase()
          if(strFilter.indexOf(strPostfix)>-1) return true
    }
    return false
}

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.send('users进入路由根目录');

});
router.post('/login',function(req,res){  
  user.Login(req,res)
})
router.get('/getUserDataByToken',function(req,res){
  user.getUserDataByToken(req,res)
})
router.get('/getUsersByTypePage',function(req,res){
  user.getUsersByTypePage(req,res)
})
router.get('/delUserdata',function(req,res){
  if(req.query.u_id==1)res.send('您不能删除管理员')
  else user.delUserdata(req,res)
})
router.post('/upUserdata',function(req,res){
     user.upUserdata(req,res)
})
router.post('/setXlsxData',function(req,res){
     user.setXlsxData(req,res)
})

//修改个人密码
router.post('/upPwd',function(req,res){
   user.upPwd(req,res)
})
//修改个人头像
router.post('/upicon',async function(req,res){
  let head_imgUrl = await fileUp.upload(req,{fileDir:'public/file_avator'})
  req.head_imgUrl = head_imgUrl//添加属性进入req
  //判断后缀名是否是图片的后缀名 即判断是否是图片
  let isPicture =  head_imgUrl.isPicture()
  if (!isPicture) res.send('没有选择图片或者图片格式不对')
  else{
       //注意 这里的token是在req.query里
      let verify = await jwtUtils.verifysync(req.query.token,jwtSecretKey)
      console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++')
      console.log(verify)
      req.u_id = verify.id //添加u_id进req
      user.upUserHead(req,res)
  }

})

module.exports = router;
