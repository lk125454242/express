/**
 * Created by Administrator on 2016/6/28.
 */
var crypto = require('crypto');
require('../mongodb/modules');
var User = mongoose.model('Users');
var cookieParse = require('cookie-parser');

//检测cookie
exports.cookie_auth = function (prop,msg) {
    return function (req, res, next) {
        console.log(req);
        next();
    }
};
//检测session
exports.session_auth = function (prop,msg) {
    return function (req, res, next) {
        console.log(req);
        next();
    }
};
//检测权限
exports.level_auth = function (prop,msg) {
    return function (req, res, next) {
        console.log(req);
        next();
    }
};