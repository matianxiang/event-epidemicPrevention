const config = require('../config')
//注意一定要用const
const jwtSecretKey = config.jwtSecretKey
const jwtUtils = require('../utils/jwtUtils')
const redisUtils = require('../utils/redisUtils')
module.exports = class users_dao extends  require('../model/users_mod'){
    // 继承 user_mod 这个类



    /**
     * 登陆
     * @param req
     * @param res
     * @return (Promise<void>)
     * @constructor
     */ 
    static async Login(req,res){
        let body = req.body
        let loginData = await this.LoginUser(body.username,body.password,body.type)
        //let loginData = await this.LoginUserByid(body.username,body.password,body.type)
        if (loginData.length!=0) {
            // 长度不等于0 登录成功 生成Token 解密密钥是global.globalKey 有效时间3600s
              let  jwt_token = jwtUtils.sign({
                  id: loginData[0].id,
                  username: loginData[0].username,
                  head: loginData[0].head,
                  type: loginData[0].type,
                  classes:loginData[0].classes,
                  address: loginData[0].address,
                  sex: loginData[0].sex,
                  createtime: loginData[0].createtime
             },jwtSecretKey,'3600s')
             res.send({loginData,jwt_token})  //登录成功返回登陆数据、token  注意这里要用{}包裹
        }else res.status(500).send('用户名或密码输入错误！')

    }

    /**
     *
     *根据加密后的token解析成用户信息
     * @static
     * @param {*} req
     * @param {*} res
     */
    static async getUserDataByToken(req,res){
        // 这里的token经过在登录时由密钥和用户信息生产
        let result = await jwtUtils.verifysync(req.query.token,jwtSecretKey)
        res.send(result)
    }
    
    /**
     *
     *根据用户类型进行用户信息获取(分页获取总数量与数据)
     * @static
     * @param {*} req
     * @param {*} res
     */
    static async getUsersByTypePage(req,res){
       // console.log(req.query)
        let query = req.query
        //console.log('query',query)
        let data = await this.getUsersByTypePageMod(query.type,query.currPage,query.pageNum) //方法在users_mod父类里
        let total = await this.getUsersByTypePageTotal(query.type) //方法在users_mod父类里
        //查看数据库返回的total
        // res.send(total)
        // [
        //     {
        //         "count": 3
        //     }
        // ]
        //console.log(data)
        res.send({data:data,total:total[0].count})
    }

    /**
     *用户删除(同时清空该用户阅读记录)
     *
     * @static
     * @param {*} req
     * @param {*} res
     */
    static async delUserdata(req,res){
          console.log(req.query)
          let results = await this.delUserdataMod(req.query.u_id)
          // 清空该用户阅读记录
          results+=await this.delRead(req.query.u_id)
          res.send(results)
    }

    /**
     *更改用户信息
     *
     * @static
     * @param {*} req
     * @param {*} res
     */
     static async upUserdata(req,res){
        let body = req.body
        let u_id = body.u_id
        let username = body.username
        let sex = body.sex
        let address = body.address
        let type = body.type
        let results = await this.upUserdataMod(u_id,username,sex,address,type)
        res.send(results)
  }

    /**
     *上传用户文件导入用户信息
     *
     * @static
     * @param {*} req
     * @param {*} res
     */
     static async setXlsxData(req,res){
        let xlsxData = await redisUtils.get('xlsxData')
        let allUsers = await this.getAllUsers()
        if (xlsxData=='err'){
             res.send('导入失败，不是标准文件格式')
             return
        }
        //console.log(typeof xlsxData) string 要转为json格式
        //console.log(JSON.parse(xlsxData)[0].data)
        xlsxData = JSON.parse(xlsxData)[0].data
        let inXlsxArr = []
        let inflag = true //是否插入标识
        // id username password head address sex classes type 共8项 
        if(xlsxData[0].length!=8) res.send('导入数据格式错误')
        for(let i =1;i<xlsxData.length;i++){
            // id不能为1 与管理员冲突
            if(xlsxData[i][0]!=1){
                  let flag =true 
                  let xlsxObj = {}
                  //除了头像可以为空 其他都不可以
                  if(xlsxData[i][0]==null||xlsxData[i][1]==null||xlsxData[i][2]==null||xlsxData[i][4]==null||xlsxData[i][5]==null||xlsxData[i][6]==null||xlsxData[i][7]==null){
                            inflag =false 
                            //可插入标识为false
                  }
                        xlsxObj.id = xlsxData[i][0]
                        xlsxObj.username = xlsxData[i][1]
                        xlsxObj.password = xlsxData[i][2]
                        xlsxObj.head = xlsxData[i][3] || 'moren.jpg'
                        xlsxObj.address = xlsxData[i][4]
                        xlsxObj.sex = xlsxData[i][5]
                        xlsxObj.classes = xlsxData[i][6]
                        xlsxObj.type = xlsxData[i][7]
                  
                //  遍历数据库中的数据 
                  for(let i =0;i<allUsers.length;i++){
                      if(xlsxObj.id == allUsers[i].id) flag =false
                  }
                    if(flag) inXlsxArr.push(xlsxObj)
                  
            }
        }
        if(inflag){
            if(inXlsxArr.length!=0){
                this.inXlsxData(inXlsxArr)
            }
            res.send('xlsx数据表导入数据成功')
          }else{
             res.status(500).send('导入文件中的数据部分格式错误，导入失败')
          }
  }

    /**
     *修改个人信息
     *
     * @static
     * @param {*} req
     * @param {*} res
     */
    static async upPwd(req,res){
      let verify = await jwtUtils.verifysync(req.body.token,jwtSecretKey)
      let u_id = verify.id
      let oldPassword = req.body.oldpassword
      let newPassword = req.body.newpassword
      let result = await this.upPwdMod(u_id,oldPassword,newPassword)
      if(result.changeRows == 0) res.send('密码修改失败')
      else res.send('密码修改成功')
    }

    /**
     *修改个人头像
     *
     * @static
     * @param {*} req
     * @param {*} res
     */
    static async upUserHead(req,res){
        let result = await this.upUserHeadMod(req.head_imgUrl,req.u_id)
        res.send(result)
    }
}