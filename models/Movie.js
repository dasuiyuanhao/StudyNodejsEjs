/**
 * Created by Administrator on 2015/5/26.
 */
var mongodb = require('../mongodb');
var Schema = mongodb.mongoose.Schema;

var MovieSchema = new Schema({
    name : String,
    alias : [String],
    publish : Date,
    create_date : { type: Date, default: Date.now},
    images :{
        coverSmall:String,
        coverBig:String,
    },
    source :[{
        source:String,
        link:String,
        swfLink:String,
        quality:String,
        version:String,
        lang:String,
        subtitle:String,
        create_date : { type: Date, default: Date.now }
    }]
});

var Movie = mongodb.mongoose.model("Movie", MovieSchema);
var MovieDAO = function(){};
module.exports = new MovieDAO();

//加载搜索客户端
var searchserver = require('../searchserver');
var indexTypeName="movies";

//保存，新增或者更新
MovieDAO.prototype.save = function(obj, callback) {
    if(obj._id){//update
        var jsonData=obj;
        //获取数据库中数据
        var query = Movie.findOne().where('_id', jsonData._id);
        query.exec(function(err, doc) {
            if(doc){
                var query = doc.update({
                    $set: {
                        name: jsonData.name,
                        publish: jsonData.publish,
                        alias: jsonData.alias,
                        images:jsonData.images,
                        source:jsonData.source
                    }
                });
                query.exec(function (err, results) {
                    console.log("\n%d Documents updated", results);
                    //Movie.findOne({word: 'gratifactions'}, function (err, doc) {
                    //    console.log("\nAfter Update: ");
                    //    console.log(doc.toJSON());
                    //    mongoose.disconnect();
                    //});
                    callback(err, results);
                });
            }

        });
    }else{//insert
        var instance = new Movie(obj);
        instance.save(function (err) {
            callback(err, obj);
        });
    }
};

//查询所有数据
MovieDAO.prototype.getAll = function(callback) {
    Movie.find(function (err, data) {
        //if (err) return console.error(err);
        //console.log(data)

        callback(err,data);
    });
};
/*
* 查询
* 条件、排序、分页
* 如果pageIndex小于1，则查询所有
* */
MovieDAO.prototype.query = function(queryCondition,sort,pageIndex,pageSize, callback) {
    //Movie.find({ name: /^Fluff/ }, callback);

    var query = Movie.find(queryCondition);
    //if(req.query.contains.length > 0){
    //    query.find({'word' : new RegExp(req.query.contains, 'i')});
    //}
    //排序
    if(sort!=undefined && sort!=null){
        query.sort(sort);
    }
    //分页
    if(pageIndex>0){
        var limitNum=10;
        var skipNum=0;
        if(pageSize!=undefined && pageSize!=null){
            limitNum=pageSize;
            skipNum=(pageIndex-1)*pageSize;
        }
        query.limit(limitNum)
            .skip(skipNum);
    }
    //执行查询
    query.exec(function(err, data) {
        callback(err, data);
    });

};

/*查询一条数据
* */
MovieDAO.prototype.getMovie = function(id, callback) {
    var queryCondition={"_id":id};
    var query = Movie.find(queryCondition);
    //执行查询
    query.findOne(function(err, data) {
        callback(err, data);
    });

};

//删除并重建索引
MovieDAO.prototype.DeletAndCreateAllIndex = function(obj, callback) {
    var err=null;
    var data={success:false};
    if(searchserver){
        //删除所有索引
        searchserver.client.delete({
            index: searchserver.searchIndexName,
            type: indexTypeName,
            //id: '1'
            consistency:"all"
        }, function (error, response) {
            if(!error){
                return callback(error,data);
            }

        });
        //重建索引
        this.getAll(function (err,data) {
            if(data){
                if(data.length>0){
                    forEach(data,function(item,index){
                        client.create({
                            index: searchserver.searchIndexName,
                            type: indexTypeName,
                            id: item._id,
                            body: {
                                title: item.name,
                                tags: ['y', 'z'],
                                published: true,
                                published_at: '2013-01-01',
                                counter: 1
                            }
                        }, function (error, response) {
                            // ...
                        });
                    });

                }
            }
        });
    }



    err="执行失败";
    return callback(err,data);
};

