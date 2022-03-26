module.exports = class student_mod extends require('./model'){
      

    /**
     *根据我的班级分页获取我的通知
     *
     * @static
     * @param {*} u_classes 我的班级
     * @param {*} currPage 当前分页
     * @param {*} pageNum 每页数量
     */
    static getNoticeMod(u_classes,currPage,pageNum){
           pageNum = Number(pageNum)
           currPage = Number(currPage)
           currPage = pageNum*currPage
           return new Promise((resolve,reject)=>{
                //  根据班级进行模糊查询 比如u_classes=2班 那么列表里有2班的每条数据就会返回
                 let sql = "select * from notice where class like '%"+u_classes+"%' order by createtime desc limit ?,?"
                 this.query(sql,this.formatParams(currPage,pageNum)).then(result=>{
                       resolve(result)
                 }).catch(err=>{
                      reject(err)
                 })
           })
    }


    static getNoticeTotal(u_classes){
         return new Promise((resolve,reject)=>{
            //  根据u_classes 模糊查询
              let sql = "select count(1) as count from notice where class like '%"+u_classes+"%'"
              this.query(sql).then(result=>{
                   resolve(result)
              }).catch(err=>{
                  reject(err)
              })
         })
    }


    /**
     *获取我的已读通知列表
     *read表中的数据都是已读的，read表中没有的就是未读的，前端渲染时默认为未读
     *
     * @static
     * @param {*} u_id
     * @return {*} 
     */
    static getNoticeReadMod(u_id){
         return new Promise((resolve,reject)=>{
            //  read是数据库中的特殊字 所以要加``
            let sql = "select * from `read` where u_id=?"
            this.query(sql,u_id).then(result=>{
                 resolve(result)
            }).catch(err=>{
                 reject(err)
            })
         }
            
         )
    }

    /**
     *已读转未读
     *
     * @static
     * @param {*} u_id
     * @param {*} n_id
     * @return {*} 
     */
    static goweiduMod(u_id,n_id){
         u_id = Number(u_id)
         n_id = Number(n_id)
         return new Promise((resolve,reject)=>{
          // 删掉read表中对应的数据
              let sql ='delete from `read` where u_id = ? and n_id =?'
              this.query(sql,this.formatParams(u_id,n_id)).then(result=>{
                   resolve(result)
              }).catch(err=>{
                   console.log('已读转未读失败')
                   reject('已读转未读失败')
              })
         })
    }

     /**
     *未读转已读
     *
     * @static
     * @param {*} u_id
     * @param {*} n_id
     * @return {*} 
     */
     static goyiduMod(u_id,n_id){
          u_id = Number(u_id)
          n_id = Number(n_id)
          return new Promise((resolve,reject)=>{
           // 增加read表中对应的数据
               let sql ='insert into `read` (u_id,n_id) values (?,?)'
               this.query(sql,this.formatParams(u_id,n_id)).then(result=>{
                    resolve(result)
               }).catch(err=>{
                    console.log('未读转已读失败')
                    reject('未读转已读失败')
               })
          })
     }

     /**
      *提交健康填报表
      *
      * @static
      * @param {*} u_id
      * @param {*} temperature
      * @param {*} hot
      * @param {*} to_highrisk
      * @param {*} from_highrisk
      * @param {*} fever
      * @param {*} leave
      * @param {*} hesuan
      * @param {*} contact_risk
      * @param {*} masknum
      * @param {*} kills
      */
     static sethealthMod(u_id,temperature,hot,to_highrisk,from_highrisk,fever,leaveout,hesuan,contact_risk,mask_rest,kills){
       return new Promise((resolve,reject)=>{
            let sql ="insert into health(u_id,temperature,hot,to_highrisk,from_highrisk,fever,leaveout,hesuan,contact_risk,mask_rest,kills) values (?,?,?,?,?,?,?,?,?,?,?)"
            console.log(sql)
            this.query(sql,this.formatParams(u_id,temperature,hot,to_highrisk,from_highrisk,fever,leaveout,hesuan,contact_risk,mask_rest,kills)).then(result=>{
                 resolve('健康表提交成功')
            }).catch(err=>{
                  reject('健康表提交失败')
            })
       })

     }

     /**
      *分页获取当天健康填报表与总数量
      *
      * @static
      * @param {*} today
      * @param {*} tomorrow
      * @param {*} currPage
      * @param {*} pageNum
      */
     static gethealthNowDayPageMod(today,tomorrow,currPage,pageNum){
          currPage = Number(currPage)
          pageNum = Number(pageNum)
          currPage = currPage* pageNum
          return new Promise ((resolve,reject)=>{
               let sql = "select * from health where createtime between ? and ? LIMIT ?,?"
               console.log(sql)
               this.query(sql,this.formatParams(currPage,pageNum)).then(result=>{
                     resolve(result)
               }).catch(err=>{
                    reject(err)}
                    )
          })
     }

     static gethealthNowDayPageTotal(today,tomorrow){
          return new Promise ((resolve,reject)=>{
               let sql = "select count(1) as count from health where createtime between ? and ?"
               console.log(sql)
               this.query(sql,this.formatParams(currPage,pageNum)).then(result=>{
                     resolve(result)
               }).catch(err=>{
                    reject(err)}
                    )
          })
     }


     /**
      *查询今日填报表
      *
      * @static
      * @param {*} u_id
      * @param {*} today
      * @param {*} tomorrow
      * @return {*} 
      */
     static gethealthNowDayByIdMod(u_id,today,tomorrow){
          return new Promise((resolve,reject)=>{
               let sql ="select * from health where (createtime between ? and ?) and u_id = ?"
               this.query(sql,this.formatParams(today,tomorrow,u_id)).then(result=>{
                     resolve(result)
               }).catch(err=>{
                     reject('查询今日健康填报表失败')
               })
          })
     }


     /**
      *查询当日总报表
      *
      * @static
      * @param {*} today
      * @param {*} tomorrow
      * @return {*} 
      */
     static gethealthNowDayMod(today,tomorrow){
          return new Promise((resolve,reject)=>{
            let sql = "select * from health where createtime between ? and ?"
            this.query(sql,this.formatParams(today,tomorrow)).then(result=>{
                 resolve(result)
            }).catch(err=>{
                 reject('获取当天所有报表失败')
            })
          })
     }

     /**
      *查询当月总报表
      *
      * @static
      * @param {*} today
      * @param {*} tomorrow
      * @return {*} 
      */
      static gethealthNowMonthMod(thisMonth,nextMonth){
          return new Promise((resolve,reject)=>{
            let sql = "select * from health where createtime between ? and ?"
            this.query(sql,this.formatParams(thisMonth,nextMonth)).then(result=>{
                 resolve(result)
                 console.log(result)
            }).catch(err=>{
                 reject('获取当月所有报表失败')
            })
          })
     }


     /**
      *学生请假表申请
      *
      * @static
      * @param {*} u_id
      * @param {*} classes
      * @param {*} reason
      * @param {*} leavetype
      * @param {*} starttime
      * @param {*} endtime
      */
     static setLeaveMod(u_id,classes,reason,leavetype,starttime,endtime){
         u_id = Number(u_id)
         return new Promise((resolve,reject)=>{
               let sql = "insert into `leave` (u_id,classes,reason,leavetype,starttime,endtime,state) value(?,?,?,?,?,?,0)"
               this.query(sql,this.formatParams(u_id,classes,reason,leavetype,starttime,endtime)).then((result)=>{
                         resolve('提交申请成功')
               }).catch(err=>{
                     reject('提交申请失败')
               })
         })
     }

}