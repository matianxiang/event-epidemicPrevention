const jwt = require('express-jwt')
const jwtUtils = require('../utils/jwtUtils')
//拿到密钥
const config = require('../config')
//注意一定要用const 
const jwtSecretKey = config.jwtSecretKey
module.exports = class admin_dao extends require('../model/admin_mod') {

   /**
    *
    *. 根据用户类型与查询字段模糊查询(数据与总数量返回)
    * @static
    * @param {*} req
    * @param {*} res
    */
   static async getUsersByTypeAndChar(req, res) {
      //此处出现过错误  原因路由中把req和res颠倒了 导致query是undefined 下次debug方法 console.log(req,res)   
      let query = req.query
      let type = query.type
      let inputText = query.inputText
      let CharType = query.CharType
      let pageNum = query.pageNum
      let currPage = query.currPage


      let data = await this.getUsersByTypeAndCharMod(type, inputText, CharType, pageNum, currPage)
      let total = await this.getUsersByTypeAndCharTotal(type, inputText, CharType)

      res.send({
         data,
         total: total[0].count
      })
   }


   /**
    *发布通知函数
    *
    * @static
    * @param {*} req
    * @param {*} res
    */
   static async announce(req, res) {
      let title = req.body.title
      let classes = req.body.classes
      let results = await this.announceMod(title, classes)
      res.send(results)
   }
   /**
    *分页获取所有通知
    *
    * @static
    * @param {*} req
    * @param {*} res
    */
   static async getAllNotice(req, res) {
          //每页多少条 10
          let pageNum = req.query.pageNum
          //当前页码  0
          let currPage = req.query.currPage
          let data = await this.getAllNoticeMod(pageNum,currPage)
          let total = await this.getAllNoticeTotal()
          res.send({data,total:total[0].count})
   }

   /**
    *获取该老师所属班级的全部请假单和数量(分页查询)
    *
    * @static
    * @param {*} req
    * @param {*} res
    */
   static async getLeave(req,res){
          //get 方法 req.query
          let query = req.query
          let verify = await jwtUtils.verifysync(query.token,jwtSecretKey)
          // ; 分割班级数据
          let classArr = verify.classes.split(';')
          let data =await this.getLeaveMod(classArr,query.currPage,query.pageNum)
          let total = await this.getLeaveTotal(classArr)
          res.send({data,total:total[0].count})
   }
  

   /**
    *获取该用户请假审批与数量(分页) 
    *
    * @static
    * @param {*} req
    * @param {*} res
    */
   static async getuserLeave(req,res){
        let query = req.query
        let verify = await jwtUtils.verifysync(query.token,jwtSecretKey)
        let u_id = verify.id
        let data = await this.getuserLeaveMod(u_id,query.currPage,query.pageNum)
        let total = await this.getuserLeaveToatal(u_id)
        res.send({data,total:total[0].count})

   } 


   /**
    *当前请假单审批(修改审批状态)
    *
    * @static
    * @param {*} req
    * @param {*} res
    */
   static async upLeaveState(req,res){
        let result = await this.upLeaveStateMod(req.query.l_id,req.query.upState)
        res.send(result)
   }


   /**
    *查看公告详情
    *
    * @static
    * @param {*} req
    * @param {*} res
    */
   static async NoticeDetails(req,res){
      let n_id = req.query.n_id
      let users = {}
      //1 获取当前公告已读人数
      let readNum = await this.getReadNum(n_id)
      readNum = readNum[0].count
      //readNum是对象 res.send({readNum})

      //2 获取当前公告已读的人的id数组，再通过id去查询用户数据
      let readIdArr = await this.getReadId(n_id)
      if(readIdArr.length!=0) users = await this.getReadByIdArr(readIdArr)
         //console.log(users)

      //3 获取当前通知的详情信息
      let data = await this.NoticeDetailsMod(n_id)
       //console.log(data)

      //4 获取当前公告通知的总人数
      //data[0].class是当前公告所发布到的班级 根据对应的班级的总人数获取要通知的总人数
      let total = await this.NoticeDetailsTotal(data[0].class)
      total = total[0].count
       //console.log(total)

      //5. 获取已读人的阅读时间与u_id
      let idAndTime = await this.getReadTime(n_id)
      //console.log(idAndTime)
      //将阅读时间附加到users中
      for (let i=0;i<idAndTime.length;i++){
           for(let j =0;j<users.length;j++){
                if(users[i].id==idAndTime[j].u_id){
                     users[i].readtime=idAndTime[j].readtime
                }
           }
      }
     res.send({
        data,
        readNum,
        total,
        users
     })
      
   }


   /**
    *当前公告删除功能(同时清空该公告被阅读功能 删除两张表中的数据)
    *
    * @static
    * @param {*} req
    * @param {*} res
    */
   static async delNotice(req,res){
          let result =await this.delNoticeMod(req.query.n_id)
          result+=await this.delReadMod(req.query.n_id)
          console.log(result)
          res.send(result)
   }



   /**
    *获取班级
    *
    * @static
    * @param {*} req
    * @param {*} res
    */
   static async getClasses(req,res){
       let data = await this.getClassesMod()
       res.send(data)
   }

   /**
    *添加班级
    *
    * @static
    * @param {*} req
    * @param {*} res
    */
   static async addClasses(req,res){
      //获取已有的所有班级
       let classAll = await this.getClassesMod()
       //req.query.classes 要添加的班级
       let result = await this.addClassesMod(classAll,req.query.classes)
       res.send(result)
   }


   /**
    *模糊查询班级(分页获取数据与数量)
    *
    * @static
    * @param {*} req
    * @param {*} res
    */
   static async getClassesSear(req,res){
        let classes = req.query.inputText
        let data = await this.getClassesSearMod(classes,req.query.pageNum,req.query.currPage)
        let total = await this.getClassesSearTotal(classes)
        console.log('++++++++++++++++++++++++++++++++++++')
        console.log(data)
        res.send({data,total:total[0].count})
   }
}