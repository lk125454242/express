/**
 * Created by Administrator on 2016/6/28.
 */
var qs = require('querystring');
var mongoose = require('mongoose');
var User = mongoose.model('Users');

var Redis = require('../config/server').Redis;

var secret = require('../config/secret');//获取全局加密文件
var efficacy = function (req, res ,fn) {//登录验证通过
    var cookies = req.cookies,
        account = cookies.i,
        auth = cookies.Auth;
    if(cookies && auth){
        Redis.get(auth.usd).then(function (data) {
            if(+data === auth.tmp){
                fn();//权限通过
                return true;
            }else {
                res.error('登录失效,请重新登录');
            }
        })
    }else {
        res.error('登录失效,请重新登录');
    }
    if(account){
        account = qs.parse(secret.decipher(account));
    }
    return false;
};
//检测cookie
exports.cookie_auth = function (req, res, next) {
    efficacy(req,res,function () {
        next();
    });//校验cookie的正确性
};
//检测session
exports.session_auth = function (req, res, next) {
    next();
};
//检测权限
exports.level_auth = function (req, res, next) {
    console.log(req.cookie);
    next();
};
//检测失效
exports.invalid = function (req, res, next) {
    var auth = req.cookies.Auth;
    if(auth){

    }

    console.log(req);
    
    next();
};