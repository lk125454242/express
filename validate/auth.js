/**
 * Created by Administrator on 2016/6/28.
 */
var qs = require('querystring');
var mongoose = require('mongoose');
var User = mongoose.model('Users');

var secret = require('../config/secret');//获取全局加密文件
var efficacy = function (req) {
    var cookies = req.cookies,
        account = cookies.i,
        auth = cookies.Auth,
        id,last_index;
    if(account){
        account = qs.parse(secret.decipher(account));
        if(auth){
            last_index = auth.lastIndexOf('usd%3D');//获取id开始的下标
            id = auth.slice(last_index);
            auth  = qs.parse(auth.slice(0, last_index));
            console.log(auth);
            console.log(id);
            User.findById(id,function () {
                
            })
        }
    }
    return true
};


//检测cookie
exports.cookie_auth = function (req, res, next) {
    efficacy(req);//校验cookie的正确性
    
    next();
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