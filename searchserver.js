/**
 * Created by Administrator on 2015/6/5.
 */
var elasticsearch = require('elasticsearch');

// 使用默认配置连接到 localhost:9200
var client = new elasticsearch.Client();

// 连接两个节点，负载均衡使用round-robin算法
var client = elasticsearch.Client({
    hosts: [
        //'192.168.1.191:9200',
        //'192.168.1.191:9300'
        'localhost:9200',
        'localhost:9300'
    ]
});

client.ping({
    requestTimeout: 30000,

    // undocumented params are appended to the query string
    hello: "elasticsearch!"
}, function (error) {
    if (error) {
        console.error('elasticsearch cluster is down!');
    } else {
        console.log('All is well');
    }
});
/*
 *Allow 404 responsesedit
 *Prevent 404 responses from being considered errors by telling the client to ignore them.
 */
client.indices.delete({
    index: 'test_index',
    ignore: [404]
}).then(function (body) {
    // since we told the client to ignore 404 errors, the
    // promise is resolved even if the index does not exist
    console.log('index was deleted or never existed');
}, function (error) {
    // oh no!
});

// 获取状态，参数可选，可以只传递一个回调
client.cluster.health(function (err, resp) {
    if (err) {
        console.error(err.message);
    } else {
        console.dir(resp);
    }
});

//// 建立索引
//client.index({
//    index: 'blog',
//    type: 'post',
//    id: 1,
//    body: {
//        title: 'JavaScript Everywhere!',
//        content: 'It all started when...',
//        date: '2013-12-17'
//    }
//}, function (err, resp) {
//    // ...
//});
//
//// 搜索文档
//client.search({
//    index: 'users',
//    size: 50,
//    body: {
//        query: {
//            match: {
//                profile: 'elasticsearch'
//            }
//        }
//    }
//}).then(function (resp) {
//    var hits = resp.body.hits;
//});


client.search({
    index: 'twitter',
    type: 'tweets',
    body: {
        query: {
            match: {
                body: 'elasticsearch'
            }
        }
    }
}).then(function (resp) {
    var hits = resp.hits.hits;
}, function (err) {
    console.trace(err.message);
});