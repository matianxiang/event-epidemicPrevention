const mysql = require('mysql')

const pool = mysql.createPool({
    host: '47.93.43.48',
    user: 'mydb',
    password: 'admin',
    port: '3306',
    database: 'mydb'
})


/**
 * 封装一个数据库模型基类
 * @type｛module.Model}
 */
module.exports = class Model {
    /**
     * 通用的查询方法
     * @param sql 要执行的语句
     * @param params 给sql语句的占位符进行赋值的参数数组
     */

    static query(sql, params) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    console.error(err)
                    connection.release()
                } else {
                    //query执行sql语句
                    connection.query(sql, params, (err, results) => {
                        if (err) {
                            console.error(err)
                            reject(err)
                        } else {
                            resolve(results)
                        }
                        //结束回话，释放连接
                        connection.release()
                    })
                }
            })
        })
    }


    /* 
     *封装一个可以解构参数变为数组的方法
     */
    static formatParams() {
        let arr = []
        for (let i = 0; i < arguments.length; i++) {
            arr.push(arguments[i])
        }
        return arr
    }

    /**
     *封装一个获取今天和明天日期的函数
     *
     * @static
     * @return {*} 
     */
    static getNowAndLateDate(){
        let date =new Date()
             let Month = ''
             //getMonth()获得的月份是0-11 小于10前面加0
             if((date.getMonth()+1)<10) Month ='0'+String((date.getMonth()+1))
             else Month=(date.getMonth()+1)
             //今天开始和今天结尾 用于获取当日之间的数据
             let today = ''+date.getFullYear()+Month+date.getDate() //''+.. 转字符串
             let tomorrow = ''+date.getFullYear()+Month+(date.getDate()+1)

            //  封装一个获取当前月份的天数函数
            function currMonthDays(){
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                let d = new Date(year, month, 0);
                return d.getDate();
            }

           let currMonthDayNums= currMonthDays()
             //这个月开始和这个月结尾 用于获取当月之间的数据 1号到28或29或30或31号
             let thisMonth = ''+date.getFullYear()+Month+'01'
             let nextMonth = ''+date.getFullYear()+Month+currMonthDayNums


             //KEY 是字符串
        return ({'today':today,'tomorrow':tomorrow,thisMonth,nextMonth})
    }
}