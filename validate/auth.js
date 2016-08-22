/**
 * Created by Administrator on 2016/6/28.
 */
var qs = require('querystring');
var mongoose = require('mongoose');
var _ = require('lodash');
var User = mongoose.model('Users');//获取user模版
var tools = require('../tool_fn/base');//获取工具函数库
var Redis = require('../config/server').Redis;//获取redis服务器
var secret = require('../config/secret');//获取全局加密文件
var cookies_options = require('../config/cookies').cookie_options;

var cookie_4h =  _.assign({ maxAge: 14400000 }, cookies_options);
var cookie_5m = _.assign({ maxAge: 300000 }, cookies_options);

exports.setCookie = function (req, res, user) {
    var cookie = secret.cipher(qs.stringify({
        u: user.username
    }));
    var now = Date.now();
    res.cookie('i', cookie, cookie_4h).cookie('Auth', {
        email: user.email,
        birthday: user.birthday,
        nickname: user.nickname,
        head: user.head,
        usd: '' + user._id,
        tmp: now
    }, cookie_4h).success({
        code: 200,
        message: '登陆成功'
    });
    Redis.set(user._id, now);//写入redis缓存池
};

//检测 请求时间
exports.cookie_times = function (req, res, next) {
    var cookies = req.cookies,number = 1,originalUrl = tools.first_upper(req.originalUrl);
    if(cookies){
        number = ( Number( req.cookies[originalUrl] ) + 1) || 1 ;
        if(number > 5){
            res.error('操作过于频繁,封停5分钟');
            return false;
        }
    }
    res.cookie(originalUrl, number, cookie_5m);
    next();
};
//检测cookie session
exports.cookie_auth = function (req, res, next) {//校验cookie的正确性
    var cookies = req.cookies,
        account = cookies.i,
        auth = cookies.Auth;
    if(cookies && auth){
        Redis.get(auth.usd).then(function (data) {
            if(+data === auth.tmp){
                next();//权限通过
                return true;
            }else {
                res.error('登录失效,请重新登录');
            }
        })
    }else {
        res.error('请登录');
    }
    return false;
};
//检测权限
exports.level_auth = function (req, res, next) {
    var cookies = req.cookies;
    if(cookies){
        var account = cookies.i;
        account = qs.parse(secret.decipher(account));
        if(account && account.u === 'lk125454242'){
            next();
        }else {
            res.error('当前用户权限不足');
        }
    }else {
        res.error('请登录');
    }
};