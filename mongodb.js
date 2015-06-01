/**
 * Created by Administrator on 2015/5/26.
 * Mongdb
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://LiangPC/StudyNodeJS'); //数据库连接字符串mongodb://Server名称/库名
exports.mongoose = mongoose;