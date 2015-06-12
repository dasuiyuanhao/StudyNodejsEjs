/**
 * Created by Administrator on 2015/6/12.
 */
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

// create reusable transporter object using SMTP transport
var emailOption={
    host: 'smtp.163.com',
    port: 25,
    //secure:false,
    auth: {
        user: 'purewooden@163.com',
        pass: 'liang1130'
    }
};
var smtpT=smtpTransport(emailOption);
var transporter = nodemailer.createTransport(smtpT);
console.log("邮箱连接成功");

//方法入口
var emailSender=function(){

    // NB! No need to recreate the transporter object. You can use
    // the same transporter object for all e-mails

    var fromContent='木质纯 ✔ <'+emailOption.auth.user+'>';

    //发送邮件
    this.sendEmail=function(obj, callback){
        // setup e-mail data with unicode symbols
        var mailOptions = {
            //from: '木质纯 ✔ <dasuiyuanhao@163.com>', // sender address
            from: fromContent,
            to: 'dasuiyuanhao@sina.com, dasuiyuanhao@126.com', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world ✔', // plaintext body
            html: '<b>Hello world ✔</b>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log('Message sent: ' + info.response);
            }
        });
    };

};
module.exports = new emailSender();