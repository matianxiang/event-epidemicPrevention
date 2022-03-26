var express = require('express');
var router = express.Router();
const student = require('../dao/student_dao')  //导入user_dao这个类


router.get('/',function(req,res){
     res.send('students进入根目录')
})

// 根据我的班级分页获取我的通知
router.get('/getNotice',function(req,res){
   student.getNotice(req,res)
})

// 获取我的通知已读列表
router.get('/getNoticeRead',function(req,res){
     student.getNoticeRead(req,res)
})
// 已读转未读
router.get('/goweidu',function(req,res){
     student.goweidu(req,res)
})
//未读转已读
router.get('/goyidu',function(req,res){
    student.goyidu(req,res)
})

// 填报表部分
router.post('/sethealth',function(req,res){
     student.sethealth(req,res)
})

// 分页获取当日填报表和总数量  用于Homepage页面
router.get('/gethealthNowDayPage',function(req,res){
     student.gethealthNowDayPage(req,res)
})
//获取当日总报表 用于Homepage页面
router.get('/gethealthNowDay',function(req,res){
     student.gethealthNowDay(req,res)
})
//获取当月总报表  用于Homepage页面
router.get('/gethealthNowMonth',function(req,res){
     student.gethealthNowMonth(req,res)
})

// 获取当天某用户填报表 
router.get('/gethealthNowDayById',function(req,res){
     student.gethealthNowDayById(req,res)
})


// 请假表 
router.post('/setLeave',function(req,res){
     student.setLeave(req,res)
})


router.get('/')
module.exports = router