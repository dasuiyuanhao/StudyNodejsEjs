
# StudyNodejsEjs
学习NodeJS
nodejs-ejs-mongodb-bootstrap-angularjs-socket-web-development
========================================

For the Node.js,EJS , MongoDB, Bootstrap and AngularJS Web Development Movie

这个项目是学习NodeJS开发的，他包含了一个电子商务涉及到的基本技术和模块，主要包括：
   Bootstrap 和AngularJS完成前端快速开发、Mongodb数据库操作、内容管理、全文索引搜索（elasticsearch）、长连接、任务调度、邮件发送

### 一、使用的框架

基础框架
--express
npm install express

模板框架
$ npm install ejs
$ npm install cookie-session
邮件发送
$ npm install nodemailer
$ npm install nodemailer-smtp-transport
使用例子
https://github.com/andris9/nodemailer-smtp-transport#usage

工具框架
$ npm install validator
$ npm install password
$ npm install  power    
日期时间工具
$ npm install moment
用法
var moment = require('moment');
moment().format();
var now = moment();
moment("12-25-1995", "MM-DD-YYYY");


--socket
$ npm install socket.io


数据库MongoDB
--数据库组件
需要先安装node-gyp
$ npm install -g node-gyp
npm -g install mongoose

promise
$ npm install --save Q


索引框架elasticsearch
$ npm install --save elasticsearch
任务调度框架
$ npm install node-schedule



