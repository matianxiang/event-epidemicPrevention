const tools = require('../utils/tools')

module.exports = class user_mod extends require('./model'){
    // 这种写法就user_mod具有model.js上面所有的方法 是其子类 继承Model这个类

      /**
       *数据库登陆
       *@param username
       *@param password
       *@param type
       *@returns (Promise<any>)
       *@constructor
       */

    static  LoginUser(username,password,type){
        type=Number(type)
        return new Promise((resolve,reject)=>{
              let sql = "select * from user where binary username='"+username+"' and password='"+password+"' and type="+type
              console.log(sql)
            this.query(sql).then(result=>{
                 resolve(result)
            }).catch(err=>{
                reject('登录失败')
            })

      })
    }

  /**
   *根据id登录 防止用户名重复
   *
   * @static
   * @param {*} id
   * @param {*} password
   * @param {*} type
   */
  // static LoginUserByid(id,password,type){
  //   type=Number(type)
  //   return new Promise((resolve,reject)=>{
  //         let sql = "select * from user where binary id='"+id+"' and password='"+password+"' and type="+type
  //         console.log(sql)
  //       this.query(sql).then(result=>{
  //            resolve(result)
  //       }).catch(err=>{
  //           reject('登录失败')
  //       })

  // }) 
  // }


    /**
     *根据用户类型进行用户信息获取(分页获取总数量与数据)
     * @static
     * @param {*} type
     * @param {*} currPage
     * @param {*} pageNum
     */
    static getUsersByTypePageMod(type,currPage,pageNum){
            pageNum = Number(pageNum)
            currPage = Number(currPage)
            currPage = Number(currPage*pageNum)
            return new Promise((resolve,reject)=>{
                let sql = 'select * from user where type = '+type+' order by modifytime desc LIMIT ?,?'
                // 按照最后一次修改时间进行递减desc排序
                this.query(sql,this.formatParams(currPage,pageNum)).then(result=>{
                 // console.log(result)
                  resolve(result)
                }).catch(err=>{
                   reject(err)
                })
            })
    }
     
    static getUsersByTypePageTotal(type){
      // 查询总数
      return new Promise((resolve,reject)=>{

         let sql = 'select count(1) as count from user where type ='+type
        //执行查询数据库操作
         this.query(sql).then(result=>{
          resolve(result)
         }).catch(err=>{
          reject(err)
       })

      })
    }



    /**
     *
     *删除用户表用户
     * @static
     * @param {*} id
     * @return {*} 
     */
    static delUserdataMod(id){
       return new Promise((resolve,reject)=>{
            let sql ='delete from user where id ='+id
            console.log(sql)
            this.query(sql).then(result=>{
               resolve('删除用户表成功')
            }).catch(err=>{
              reject('删除用户表失败')
            })
       })
    }


    /**
     *
     *清空该用户阅读记录
     * @static
     * @param {*} id
     * @return {*} 
     */
     static delRead(id){
      return new Promise((resolve,reject)=>{
           let sql ='delete from`read` where u_id ='+id
           console.log(sql)
           this.query(sql).then(result=>{
              resolve('，删除阅读表用户数据成功')
           }).catch(err=>{
             reject('，删除阅读表用户数据失败')
           })
      })
   }

   /**
    *管理员更新用户信息
    * @static
    * @param {*} u_id
    * @param {*} username
    * @param {*} sex
    * @param {*} address
    * @param {*} type
    */
   static upUserdataMod(u_id,username,sex,address,type){
          let currTime = tools.getDate19()//调用工具包 格式化当前时间
      return new Promise((resolve,reject)=>{
          let sql = "update `user` set username='"+username+"',sex='"+sex+"',address='"+address+"',type="+type+",modifytime='"+currTime+"' where id = "+u_id
          // 用单引号包裹双引号原因是因为数据查询update语句对字符串格式的数据需要用引号包裹 eg: update users set password='123456..',status=1 where id = 7
         // console.log(sql)
          this.query(sql).then(result=>{
            resolve('更新成功')
         }).catch(err=>{
           reject('更新失败，可能是网络原因哦')
         })
        })
   }


   /**
     *获取数据库中所有的用户信息用来检验上传的数据表是否有重复的数据
     * @static
     */
     static getAllUsers(){
      return new Promise((resolve,reject)=>{
          // 直接获取所有用户信息
          let sql = 'select * from user'
          // 按照最后一次修改时间进行递减desc排序
          this.query(sql).then(result=>{
            resolve(result)
          }).catch(err=>{
             reject(err)
          })
      })
   }


   /**
    *将redis中未重复数据的进行插入
    *
    * @static
    * @param {*} inXlsxArr
    */
   static inXlsxData(inXlsxArr){
    let currTime = tools.getDate19()//调用工具包 格式化当前时间
         return new Promise((resolve,reject)=>{
            for(let i=0;i<inXlsxArr.length;i++){
              let sql = "insert into user (id,username,password,head,address,sex,createtime,classes,type) values("+inXlsxArr[i].id+",'"+inXlsxArr[i].username+"','"+inXlsxArr[i].password+"','"+inXlsxArr[i].head+"','"+inXlsxArr[i].address+"','"+inXlsxArr[i].sex+"','"+currTime+"','"+inXlsxArr[i].classes+"','"+inXlsxArr[i].type+"')"
              //console.log(sql)
              this.query(sql).then(result=>{
                  resolve(result)
              }).catch(err=>{
                reject(err)
              })
            }
         })
   }

     /**
      *修改个人密码
      *
      * @static
      * @param {*} u_id
      * @param {*} oldPassword
      * @param {*} newPassword
      */
     static upPwdMod(u_id,oldPassword,newPassword){
           return new Promise((resolve,reject)=>{
                let sql = "update `user` set password =? where password = ? and id = ?"
                this.query(sql,this.formatParams(newPassword,oldPassword,u_id)).then(result=>{
                    resolve(result)
                }).catch(err=>{
                    reject(err)
                })
           })
     }

     static upUserHeadMod(head_imgUrl,u_id){
         return new Promise((resolve,reject)=>{
             //u_id因为不是字符串 所以不用加引号
             let sql = "update `user` set head='"+head_imgUrl+"' where id ="+u_id
             this.query(sql,this.formatParams(head_imgUrl,u_id)).then(result=>{
                resolve(result)
             }).catch(err=>{
                 reject(err)
             })

         })
     }

}