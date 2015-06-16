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
  var jsonData = {};
  //jsonData =new Object(req.body.content) ;
  jsonData = req.body;
  if(!jsonData.emailContent || jsonData.emailContent==="" || !jsonData.emailTo || jsonData.emailTo==""){
    return res.send(backData);
  }

  //发送配置
  var mailOptions = {
    //to: 'dasuiyuanhao@sina.com, dasuiyuanhao@126.com', // list of receivers
    to:jsonData.emailTo,
    //subject: 'Hello ✔', // Subject line
    subject: "学习NodeJS测试", // Subject line
    //text: 'Hello world ✔', // plaintext body
    //html: '<b>Hello world ✔</b>' // html body
    html:jsonData.emailContent
  };

  var emailSender=require('../services/EmailSender');
  //var emailS=new emailSender();
  emailSender.sendEmail(mailOptions,function(err,data){
      if (err) {
        backData.success=false;
        backData.err=err;
        return res.send(backData);
      } else {
        backData.success=true;
        backData.data=data;
        return res.send(backData);
      }
  });
  //Movie.DeleteAndCreateAllIndex(jsonData, function (err, data) {
  //  if (err) {
  //    res.send({'success': false, 'err': err});
  //  } else {
  //    res.send({'success': true, 'data': data});
  //  }
  //});

});

module.exports = router;


