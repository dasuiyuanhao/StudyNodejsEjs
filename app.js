var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//日期时间工具
var moment = require('moment');
//公用
//var common =require('common');


var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('stylus').middleware(path.join(__dirname, 'public')));

//使用公用
//app.use(common());

//加载路由
var routes = require('./routes');
var users = require('./routes/users');
var movie=require('./routes/movie');

//自定义路由
app.use('/', routes);
app.use('/users', users);
app.use('/movie', movie);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//任务调度测试
//var schedule = require('node-schedule');
//var rule = new schedule.RecurrenceRule();
////rule.minute = [0,5,10,15,20,25,30,35,40,45,50,55];
//rule.second=[0,5,10,15,20,25,30,35,40,45,50,55];
//var j = schedule.scheduleJob(rule,function(){
//  console.log("执行任务调度："+moment().format());
//});

module.exports = app;
