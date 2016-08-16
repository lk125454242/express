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
var first_upper = function ( string ) {
    return string.replace(/\/(\w)/g,function(s){return s.slice(1).toUpperCase()})
};
//检测 请求时间
exports.cookie_times = function (req, res, next) {
    var cookies = req.cookies,number = 1,originalUrl = first_upper(req.originalUrl);
    if(cookies){
        console.log('times');
        number = ( Number( req.cookies[originalUrl] ) + 1) || 1 ;
    }
    if(number > 5){
        res.error('操作过于频繁,封停5分钟');
        return false;
    }
    res.cookie(originalUrl, number, {
        maxAge: 300000, //5分钟
        httpOnly: true, //浏览器禁止访问
        path: '/', //此域名下全部可使用
        secure: false//不需要使用https请求
    });
    next();
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