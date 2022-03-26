const express = require('express')
const router = express.Router()

let fs = require('fs')
let formidable = require('formidable')
let xlsx = require('node-xlsx') //解析excel表格包
const redisUtils = require('../utils/redisUtils')

router.post('/upload',function(req,res){    
    console.log('############  POST/UPLOAD  ########')
    let fileTypeError = false
    // 文件夹上传路径
    let target_path = '.\\public\\upload'
    let form = new formidable.IncomingForm()
    form.encoding = 'utf-8'
    form.keepExtensions = true
    form.maxFieldsSize = 10*1024*1024
    form.uploadDir = target_path
    console.log('sdadadadsdsads')
    let files = []
    let fields = []
    form.on('field',function(field,value){
        fields.push([field,value])
        console.log('fields',fields)
    })
    form.on('file',function(field,file){
         console.log('fileName'+file.name)
        //截取出文件后缀名  根据文件名长度截取出.后面的字符串
         let filext = file.name.substring(file.name.lastIndexOf('.'),file.name.length)
         console.log(filext) 
         if(filext !='.xlsx'){
              //写入redis 
              console.log('sadad')
              redisUtils.set('xlsxData','err','3600')
              fileTypeError = true
         }else{
             fileTypeError = false
             return 
         }
         files.push([field,file])

    })
   form.on('end',async function(){
     //遍历上传的文件
     let fileName = ''
     let obj = ''
     let exfalg = true
     //检测target_path目录是否存在
     let folder_exists = await fs.existsSync(target_path)
     if(folder_exists){
         let dirList = await fs.readdirSync(target_path)
         console.log('dirList: ',dirList)
         dirList.forEach(item=>{
              //  拼接路径
             if(!fs.statSync(target_path+'\\'+item).isDirectory()){
                 fileName = target_path+'\\'+item
                 if(!fileTypeError){
                     obj =xlsx.parse(fileName)
                     redisUtils.set('xlsxData',JSON.stringify(obj),3600000)
                     res.send({'rtnCode':'1','rtnInfo':'成功导入数据','data':obj})
                 }else{
                    //  文件解析失败
                    res.send({'rtnCode':'1','rtnInfo':'文件格式不对'})
                    exfalg = false
                 }
                 fs.unlinkSync(fileName)
             }else{
                 res.send({'rtnCode':'1','rtnInfo':'系统错误'})
                 return 
             }
         })
     }
   })
          form.on('error',function(err){
            res.send({'rtnCode':'1','rtnInfo':'上传错误'})
          })
          form.on('aborted',function(err){
            res.send({'rtnCode':'1','rtnInfo':'放弃上传'})
          })
          form.parse(req)
})


module.exports = router