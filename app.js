var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
var cookieSession = require('cookie-session');
var flash = require('connect-flash');


// 사용자 정의 모듈 추출
var index = require('./routes/index');
// var users = require('./routes/users');
// var products = require('./routes/products');
// var db = require('./model/index');

// 서버 생성
var app = express();

// view engine setup
// 서버.set
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// 미들웨어 사용
// 서버.use(모듈들);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules'))); // 노드모듈 디렉토토리 추가
app.use(cookieSession({
  keys: ['node_hoo'],
  cookie: {
    maxAge: 1000 * 60 * 60 // 유효기간 1시간
  }
}));

app.use(flash());
// passport를 미들웨어로 등록
app.use(passport.initialize());
app.use(passport.session());

// 라우터 미들웨어 설정
app.use('/', index);
// app.use('/users', users);
// app.use('/products', products);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  console.log("error handler 사용 완료");
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// console.log("export 합니다.");


// 모듈화 한다
module.exports = app;
