/**
 * Created by Administrator on 2015/6/12.
 */
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var util = require('util');

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


//方法入口
var emailSender=function(){

    // NB! No need to recreate the transporter object. You can use
    // the same transporter object for all e-mails

    this.transporter = nodemailer.createTransport(smtpT);
    console.log("邮箱连接成功");

    /**
     * 发送邮件
     * 参数obj{to:"发给谁？",subject:"主题",content:"发送内容"}
     */
    this.sendEmail=function(obj, callback){
        var backError=null;
        var backData=null;
        //检查发送参数
        var checkForSend=false;
        if(obj){
            if(!util.isNullOrUndefined(obj.to) && obj.to!="" && !util.isNullOrUndefined(obj.html) && obj.html!=""){
                checkForSend=true;
            }
        }
        if(checkForSend===false){
            backError="发送参数缺失";
            return callback(backError,backData);
        }
        //var contentHtml="<b>Hello world ✔</b>";

        var fromContent='木质纯 ✔ <'+emailOption.auth.user+'>';
        // setup e-mail data with unicode symbols
        var mailOptions = {
            //from: '木质纯 ✔ <dasuiyuanhao@163.com>', // sender address
            from: fromContent,
            //to: 'dasuiyuanhao@sina.com, dasuiyuanhao@126.com', // list of receivers
            to:obj.to,
            //subject: 'Hello ✔', // Subject line
            subject: obj.subject, // Subject line
            //text: 'Hello world ✔', // plaintext body
            //html: '<b>Hello world ✔</b>' // html body
            html:obj.html
        };

        // send mail with defined transport object
        this.transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log('Message sent: ' + info.response);
            }
            return callback(error,info);
        });
    };

};
module.exports = new emailSender();