/**
 * Created by Administrator on 2016/7/21.
 */

var mongoose = require('mongoose');
var Ioredis = require('ioredis');
var Sequelize = require('sequelize');

/*mongoDB*/
mongoose.connect(require('../link/database').mongo);//创建一个数据库连接
var db = mongoose.connection;
db.on('error', console.error.bind(console, '连接错误:'));
db.once('open', console.log.bind(console, '连接成功'));

/* redis */
var Redis = new Ioredis(6379);
exports.Redis = Redis;

/* mysql *//*
var sequelize = new Sequelize('test', 'root', '123456789', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    define: {
        dialect: 'sqlite',
        storage:  'test.sqlite',
        freezeTableName: true,
        underscored: true // 字段以下划线（_）来分割（默认是驼峰命名风格）
    }
});
*/

/*
exports.sequelize = sequelize;*/
