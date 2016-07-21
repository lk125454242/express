/**
 * Created by Administrator on 2016/7/21.
 */

var mongoose = require('mongoose');
var ioredis = require('ioredis');

/*mongoDB*/
mongoose.connect(require('../link/database').mongo);//创建一个数据库连接
var db = mongoose.connection;
db.on('error',console.error.bind(console,'连接错误:'));
db.once('open',console.log.bind(console,'连接成功'));

/* redis */
var Redis = new ioredis(6379);
