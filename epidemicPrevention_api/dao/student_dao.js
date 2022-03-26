const jwtUtils = require('../utils/jwtUtils')
//拿到密钥
const config = require('../config')
//注意一定要用const 
const jwtSecretKey = config.jwtSecretKey
module.exports = class student_dao extends require('../model/student_mod') {

    /**
     *分页获取我的通知
     *
     * @static
     * @param {*} req
     * @param {*} res
     */
    static async getNotice(req, res) {
        // 解析token 拿到所在班级
        let verify = await jwtUtils.verifysync(req.query.token, jwtSecretKey)
        let u_classes = verify.classes
        let pageNum = req.query.pageNum
        let currPage = req.query.currPage
        let data = await this.getNoticeMod(u_classes, currPage, pageNum)
        let total = await this.getNoticeTotal(u_classes)
        res.send({
            data,
            total: total[0].count
        })
    }

    /**
     *获取我的通知已读列表
     *
     * @static
     * @param {*} req
     * @param {*} res
     */
    static async getNoticeRead(req, res) {
        // 解析token 拿到个人id
        let verify = await jwtUtils.verifysync(req.query.token, jwtSecretKey)
        let u_id = verify.id
        let data = await this.getNoticeReadMod(u_id)
        res.send(data)
    }

    /**
     *已读转未读
     *
     * @static
     * @param {*} req
     * @param {*} res
     */
    static async goweidu(req, res) {
        // 解析token 拿到个人id
        let verify = await jwtUtils.verifysync(req.query.token, jwtSecretKey)
        let u_id = verify.id
        let n_id = req.query.n_id //当前点击公告
        let results = await this.goweiduMod(u_id, n_id)
        res.send(results)

    }

    /**
     *未读转已读
     *
     * @static
     * @param {*} req
     * @param {*} res
     */
    static async goyidu(req, res) {
        // 解析token 拿到个人id
        let verify = await jwtUtils.verifysync(req.query.token, jwtSecretKey)
        let u_id = verify.id
        let n_id = req.query.n_id //当前点击公告
        let results = await this.goyiduMod(u_id, n_id)
        res.send(results)

    }

    /**
     *健康填报表
     *
     * @static
     * @param {*} req
     * @param {*} res
     */
    static async sethealth(req, res) {
        let body = req.body
        let token = body.token
        let temperature = body.temperature
        let hot = body.hot
        let to_highrisk = body.to_highrisk
        let from_highrisk = body.from_highrisk
        let fever = body.fever
        let leaveout = body.leaveout
        let hesuan = body.hesuan
        let contact_risk = body.contact_risk
        let mask_rest = body.mask_rest
        let kills = body.kills
        // 解密
        let verify = await jwtUtils.verifysync(token, jwtSecretKey)
        let u_id = verify.id
        let data = await this.sethealthMod(u_id, temperature, hot, to_highrisk, from_highrisk, fever, leaveout, hesuan, contact_risk, mask_rest, kills)
        res.send(data)
    }


    /**
     *分页获取当天健康填报表与总数量
     *
     * @static
     * @param {*} req
     * @param {*} res
     */
    static async gethealthNowDayPage(req, res) {

        let today = this.getNowAndLateDate().today
        let tomorrow = this.getNowAndLateDate().tomorrow

        let currPage = req.query.currPage
        let pageNum = req.query.pageNum

        let data = await this.gethealthNowDayPageMod(today, tomorrow, currPage, pageNum)
        let total = await this.gethealthNowDayPageTotal(today, tomorrow)

        res.send({
            data,
            total: total[0].count
        })

    }


    /**
     *获取当天某用户填报表
     *
     * @static
     * @param {*} req
     * @param {*} res
     */
    static async gethealthNowDayById(req, res) {
        let verify = await jwtUtils.verifysync(req.query.token, jwtSecretKey)
        //console.log(verify) 测试有没有解密成功
        let u_id = verify.id
        let today = this.getNowAndLateDate().today
        let tomorrow = this.getNowAndLateDate().tomorrow
         
        //仅获取当天报表 按实际需求不需要分页
        let data = await this.gethealthNowDayByIdMod(u_id,today,tomorrow)
        res.send(data)

    }

    /**
     *获取今天所有报表 (今天和明天之间的所有报表)
     *
     * @static
     * @param {*} req
     * @param {*} res
     */
    static async gethealthNowDay(req,res){
      let today = this.getNowAndLateDate().today
      let tomorrow = this.getNowAndLateDate().tomorrow
      let data = await this.gethealthNowDayMod(today,tomorrow)
      res.send(data)
    }


    /**
     *获取当月所有报表 (这个月和下个月之间的所有报表)
     *
     * @static
     * @param {*} req
     * @param {*} res
     */
     static async gethealthNowMonth(req,res){
        let thisMonth = this.getNowAndLateDate().thisMonth
        let nextMonth = this.getNowAndLateDate().nextMonth
        let data = await this.gethealthNowMonthMod(thisMonth,nextMonth)
        res.send(data)
      }



    /**
     *学生请假申请
     *
     * @static
     * @param {*} req
     * @param {*} res
     */
    static async setLeave(req,res){
          let body = req.body
          let verify = await jwtUtils.verifysync(body.token,jwtSecretKey)
          let u_id = verify.id
          let classes=verify.classes
          let reason = body.reason
          let leavetype = body.leavetype
          let starttime = body.starttime
          let endtime = body.endtime

          let results = await this.setLeaveMod(u_id,classes,reason,leavetype,starttime,endtime)
          
          res.send(results)
    }

}