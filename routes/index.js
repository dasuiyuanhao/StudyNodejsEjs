var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Study Node.js' });
});
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About', year: new Date().getFullYear(), message: 'Your application description page.' });
});
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact', year: new Date().getFullYear(), message: 'Your contact page.' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: '用户登录' });
});



//加载搜索
var searchserver = require('../searchserver');

//发送邮件
var emailSender=require('../services/EmailSender');
router.post('/sendemail', function(req, res, next) {
  var backData = {'success': false, 'err': null};
  var emailSender=require('../services/EmailSender');
  //var emailS=new emailSender();
  emailSender.sendEmail();
  //Movie.DeleteAndCreateAllIndex(jsonData, function (err, data) {
  //  if (err) {
  //    res.send({'success': false, 'err': err});
  //  } else {
  //    res.send({'success': true, 'data': data});
  //  }
  //});
  backData.success=true;
  res.send(backData);
});

module.exports = router;


