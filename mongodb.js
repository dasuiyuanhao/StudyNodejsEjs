/**
 * Created by Administrator on 2015/5/26.
 * Mongdb
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://LiangPC/StudyNodeJS');
exports.mongoose = mongoose;