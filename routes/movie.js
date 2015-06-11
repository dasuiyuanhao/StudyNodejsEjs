/**
 * Created by Administrator on 2015/5/26.
 */
/**
 * Created by Administrator on 2015/5/26.
 */
//var Movie = require('./../models/Movie.js');
//exports.movieAdd = function(req, res) {
//    if(req.params.name){//update
//        return res.render('movie', {
//            title:req.params.name+'|电影|管理|moive.me',
//            label:'编辑电影:'+req.params.name,
//            movie:req.params.name
//        });
//    } else {
//        return res.render('movie',{
//            title:'新增加|电影|管理|moive.me',
//            label:'新增加电影',
//            movie:false
//        });
//    }
//};
//exports.doMovieAdd = function(req, res) {
//    res.send({'success':true});
//};

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('movie/moviemanage', { title: '电影列表管理',  message: 'Your moviemanage page.' });
});

var Movie = require('./../models/Movie.js');
router.get('/manage', function(req, res, next) {
    if(req.params.name){//update
        return res.render('/', {
            title:req.params.name+'|电影|管理|moive.me',
            label:'编辑电影:'+req.params.name,
            movie:req.params.name
        });
    } else {
        return res.render('/',{
            title:'新增加|电影|管理|moive.me',
            label:'新增加电影',
            movie:false
        });
    }
});

router.post('/addOrUpdate', function(req, res, next) {
    //res.send({'success':true});
    //console.log(req.body.content);
    var jsonData = {};
    //jsonData =new Object(req.body.content) ;
    jsonData = req.body.content;
    if (jsonData === undefined || !jsonData.name || jsonData.name == "") {
        var errMsg = "提交的数据有问题";
        console.log(errMsg);
        return res.send({'success': false, 'err': errMsg});

    }
    Movie.save(jsonData, function (err, data) {
        if (err) {
            res.send({'success': false, 'err': err});
        } else {
            res.send({'success': true, 'data': data});
        }
    });
});

//获取电影列表
router.get('/getAll', function(req, res, next) {
    Movie.getAll(function(err,data){
        res.send(data);
    });
});
//查询
router.get('/query', function(req, res) {
    var sort = getSortObj(req);
    var queryCondition = {};
    if(req.query.contains.length > 0){
        //query.find({'word' : new RegExp(req.query.contains, 'i')});
        queryCondition={'name' : new RegExp(req.query.contains, 'i')};
    }
    //分页
    var pageIndex=0;
    var pageSize=10;
    if(req.query.pageIndex){
        pageIndex=req.query.pageIndex;
    }
    if(req.query.pageSize){
        pageSize=req.query.pageSize;
    }
    Movie.query(queryCondition,sort,pageIndex,pageSize,function(err,data){
        if (!data){
            res.json(404, {msg: '没有查询到结果'});
        } else {
            res.json(data);
        }
    });
});
function getSortObj(req){
    var field = "_id";
    if(req.query.sort == 'Id'){
        field = '_id';

    } else if(req.query.sort == '名称'){
        field = 'name';
    }else{
        //field = req.query.sort.toLowerCase();
    }
    var sort = new Object();
    sort[field] = req.query.direction;
    return sort;
};

//获取某部电影
router.get('/getMovie', function(req, res, next) {
    var id=req.id;

    if(!id || id==""){
        return res.json(404, {msg: '没有查询到结果'});
    }
    Movie.getMovie(id , function(err,data){
        return res.json(data);
    });
});
//删除并重建索引
router.post('/DeleteAndCreateAllIndex', function(req, res, next) {
    var jsonData = {};
    Movie.DeleteAndCreateAllIndex(jsonData, function (err, data) {
        if (err) {
            res.send({'success': false, 'err': err});
        } else {
            res.send({'success': true, 'data': data});
        }
    });
});


module.exports = router;
