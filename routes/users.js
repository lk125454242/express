var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var validate = require('../validate/verification');

/*安装 mongoDB 中的所有modul  Schema*/
require('../mongodb/modules');
var User = mongoose.model('Users');

/* 注册账户 */
router.post('/register',
    validate.required('username','用户名'),//检测必填
    validate.length('username', 6, 12, '用户名'),//检测长度
    validate.character('username', '用户名'),//检测特殊字符
    validate.containWord('username', '用户名'),//检测字母
    validate.containNumber('username', '用户名'),//检测数字
    validate.length('password', '密码'),//检测长度
    validate.length('password', '密码'),//检测两次是否一致
    function (req, res ,next) {
        var param = req.body;
        User.find({username:param.username},function (err, users) {
            if(users.length){
                res.error(param.username + '已经被注册，请修改账户名');
            }else {
                var newUser = new User({
                    username:param.username,
                    password:param.password[0]
                });
                newUser.save(function (err, newUser) {
                    if(err){
                        res.error(JSON.stringify(err));
                    }else {
                        res.success({
                            code:200,
                            account:req.body.username,
                            body:req.body
                        });
                    }
                })
            }
        });
    }
);
/* 修改资料 */
router.post('/update',
    validate.required('username','用户名'),//检测必填
    validate.length('username', 6, 12, '用户名'),//检测长度
    validate.character('username', '用户名'),//检测特殊字符
    validate.containWord('username', '用户名'),//检测字母
    validate.containNumber('username', '用户名'),//检测数字
    validate.length('password', '密码'),//检测长度
    validate.length('password', '密码'),//检测两次是否一致
    function (req, res ,next) {
        var param = req.body;
        User.findByIdAndUpdate({_id:'57739c77c11b8630090f978b'},{},function (err, users) {
            if(err){
                res.error(JSON.stringify(err));
            }else {
                res.success({
                    code:200,
                    account:req.body.username,
                    body:req.body
                });
            }
        });
    }
);
/* 用户登录 */
router.post('/update',
    validate.required('username','用户名'),//检测必填
    validate.length('username', 6, 12, '用户名'),//检测长度
    validate.character('username', '用户名'),//检测特殊字符
    validate.containWord('username', '用户名'),//检测字母
    validate.containNumber('username', '用户名'),//检测数字
    validate.length('password', '密码'),//检测长度
    validate.length('password', '密码'),//检测两次是否一致
    function (req, res ,next) {
        var param = req.body;
        User.find({username:param.username},{},function (err, users) {
            if(err){
                res.error(JSON.stringify(err));
            }else {
                res.success({
                    code:200,
                    account:req.body.username,
                    body:req.body
                });
            }
        });
    }
);
module.exports = router;
