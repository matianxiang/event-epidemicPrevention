var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin')
var uploadRouter = require('./routes/upload')
var studentRouter = require('./routes/student')

var app = express();

/** 
 * 全系统允许跨域，这段配置要在new出express实例的时候就要配置，放在所有api前面
*/
app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*")
  //允许的header类型
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept,Access-Token,Authorization")
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS")
  if (req.method.toLowerCase() == 'options'){
      res.send(200)  //让options尝试请求快速结束
  }else{
      next()
  }
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html',require('express-art-template'))


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ----------------这三行是我们新添加的-----------
var history = require('connect-history-api-fallback');
app.use(express.static(path.join(__dirname, 'dist')));
app.use(history());

//放在所有路由前面
const config = require('./config')
const expressJWT = require('express-jwt');
const { application } = require('express');
const jwtAuth = expressJWT({
     secret: config.jwtSecretKey,
     algorithms: ['HS256'],
     //先改为false用于postman测试 上线时在修改
     credentialsRequired: true
}).unless({path:['/','/users/login']})
app.use(jwtAuth)
// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  if (err.name === 'UnauthorizedError') {
    console.error(req.path + ',无效token');
    res.status(400).send('Token无效，请重新登录')
    return
  }
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//另一种验证身份方式

// const jwtUtils=require('./utils/jwtUtils');
// const { jwtSecretKey } = require('./config');
// app.use(async function(req,res,next){
//      let path = req.path()
//      let token = "";
//      if(req.body.token) token = req.body.token
//      else token = req.query.token
//      console.log('++++++++++++++++++++')
//      /**
//       * 拦截users
//       */
//      if(path.startsWith('/users')){
//        //login 必须放行
//        if(path.startsWith('/users/login')){
//            console.log('login放行')
//            next()
//            return 
//        }
//        //其余的进行拦截
//         console.log('拦截users')
//         let result = await jwtUtils.verifysync(token,jwtSecretKey)
//         if(result.err){
//              res.status(401).send('该功能只能由登录用户使用，请前往登陆页面进行登录')
//              return
//         }else{
//             //解析成功
//             next()
//             return
//         }
//      }

//      /**
//       * 拦截admin
//       */
//       if(path.startsWith('/admin')){
//         console.log('拦截admin')
//       }

//       /**
//       * 拦截students
//       */
//        if(path.startsWith('/students')){
//         console.log('拦截students')
//       }
// })

process.on('unhandledRejection', (reason, p) => {
  console.log('Promise: ', p, 'Reason: ', reason)
  // do something
})




app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin',adminRouter)
app.use('/upload',uploadRouter)
app.use('/students',studentRouter)


// 其他路由404
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
