var express = require('express')
var router = express.Router()
const admin = require('../dao/admin_dao')
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('admin进入路由根目录')
  })
router.get('/getUsersByTypeAndChar',function(req,res){
      admin.getUsersByTypeAndChar(req,res)
})

//发布通知
router.post('/announce',function(req,res){
       admin.announce(req,res)
}) 
//获取所有通知与数量
router.get('/getAllNotice',function(req,res){
      admin.getAllNotice(req,res)
})

//获取该老师所属班级的全部请假单和数量(分页查询)
router.get('/getLeave',function(req,res){
      admin.getLeave(req,res)
})

//获取该用户请假审批与数量(分页)
router.get('/getuserLeave',function(req,res){
      admin.getuserLeave(req,res)
})

// 当前请假单审批(修改审批状态)
router.get('/upLeaveState',function(req,res){
       admin.upLeaveState(req,res)
})


//查看公告详情
router.get('/NoticeDetails',function(req,res){
      admin.NoticeDetails(req,res)
})

//删除公告
router.get('/delNotice',function(req,res){
      admin.delNotice(req,res)
})

//获取班级或专业
router.get('/getClasses',function(req,res){
        admin.getClasses(req,res)
})
//添加班级或者专业
router.get('/addClasses',function(req,res){
      admin.addClasses(req,res)
})
//模糊查询班级或专业
router.get('/getClassesSear',function(req,res){
      admin.getClassesSear(req,res)
})
module.exports = router