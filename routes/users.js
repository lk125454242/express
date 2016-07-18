var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var validate = require('../validate/verification');
var qs = require('querystring');

var secret = require('../config/secret');//获取全局配置文件

/*安装 mongoDB 中的所有modul  Schema*/
require('../mongodb/modules');
var User = mongoose.model('Users');

/* 注册账户 */
router.post('/register',
    validate.required('username', '用户名'),//检测必填
    validate.length('username', 6, 12, '用户名'),//检测长度
    validate.character('username', '用户名'),//检测特殊字符
    validate.containWord('username', '用户名'),//检测字母
    validate.containNumber('username', '用户名'),//检测数字
    validate.length('password', '密码'),//检测长度
    validate.length('password', '密码'),//检测两次是否一致
    function (req, res, next) {
        var param = req.body;
        User.find({username: param.username}, function (err, users) {
            if (users.length) {
                res.error(param.username + '已经被注册，请修改账户名');
            } else {
                var newUser = new User({
                    username: param.username,
                    password: param.password[0]
                });
                newUser.save(function (err, newUser) {
                    if (err) {
                        res.error(JSON.stringify(err));
                    } else {
                        res.success({
                            code: 200,
                            account: req.body.username,
                            body: req.body
                        });
                    }
                })
            }
        });
    }
);
/* 登录 */
router.post('/login',
    validate.required('username', '用户名'),//检测必填
    validate.length('username', 6, 12, '用户名'),//检测长度
    validate.character('username', '用户名'),//检测特殊字符
    validate.containWord('username', '用户名'),//检测字母
    validate.containNumber('username', '用户名'),//检测数字
    validate.length('password', '密码'),//检测长度
    function (req, res, next) {
        var param = req.body;
        User.findOne({username: param.username}, {}, function (err, user) {
            if (err) {
                res.error(JSON.stringify(err));
            } else {
                if (user) {
                    if (user.password === req.body.password) {
                        var cookie = secret.cipher(qs.stringify({
                            username: user.username,
                            password: user.password
                        }));
                        var info = qs.stringify({
                            email:user.email,
                            birthday:user.birthday,
                            nickname:user.nickname,
                            head:user.head
                        });
                        console.log(user);
                        res.cookie('i',cookie,{
                            maxAge: 14400000, //4个小时
                            httpOnly: true, //浏览器禁止访问
                            path: '/', //此域名下全部可使用
                            secure: false//不需要使用https请求
                        }).cookie('Auth',info,{
                            maxAge: 14400000, //4个小时
                            httpOnly: false, //浏览器可以访问
                            path: '/', //此域名下全部可使用
                            secure: false//不需要使用https请求
                        }).success({
                            code: 200,
                            message:'登陆成功'
                        });
                    } else {
                        res.error('密码错误');
                    }
                } else {
                    res.error('此用户名不存在');
                }
            }
        });
    }
);
/* 登出 */
router.post('/quit',
    function (req, res, next) {
        res.clearCookie('Auth', {path: '/'});
        res.success({
            code: 200,
            message: '登出成功'
        });
    }
);
/* 用户登录 */
router.post('/update',
    validate.required('username', '用户名'),//检测必填
    validate.length('username', 6, 12, '用户名'),//检测长度
    validate.character('username', '用户名'),//检测特殊字符
    validate.containWord('username', '用户名'),//检测字母
    validate.containNumber('username', '用户名'),//检测数字
    validate.length('password', '密码'),//检测长度
    validate.equal('password', '密码'),//检测两次是否一致
    function (req, res, next) {
        var param = req.body;
        User.findOne({username: param.username}, {}, function (err, user) {
            if (err) {
                res.error(JSON.stringify(err));
            } else {
                if(user){
                    param.password = param.password[0];
                    delete param.username;
                    User.findByIdAndUpdate(user._id,{$set:param},{},function(err,user){
                        if(err){
                            res.error(JSON.stringify(err));
                        }else {
                            res.success({
                                code: 200,
                                message: '修改成功'
                            });
                        }
                    });
                }else {
                    res.error('此用户不存在');
                }
            }
        });
    }
);
module.exports = router;
