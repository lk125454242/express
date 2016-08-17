/**
 * Created by Administrator on 2016/6/29.
 */
var express = require('express');
var mongoose = require('mongoose');
var multer = require('multer');
var _ = require('lodash');
var router = express.Router();
/* 上传中间件 */
var public_up = require('../config/upload').public_upload;
/* 验证模块 */
var auth = require('../validate/auth');
var list = require('../validate/list');
/* 数据库 module*/
var User = mongoose.model('Users');
var List = mongoose.model('List');
/* 接口 开始 */
router.all('*',auth.cookie_auth,auth.level_auth);
router.get('/', function (req, res, next) {
    res.render('index', {title: '用户中心'});
});
/* 获取 全部用户 */
router.get('/getUser',
    function (req, res) {
        console.log('???');
        User.find({}, function (err, users) {
            console.log(users);
            if (users.length) {
                res.success({
                    code: 200,
                    users: users
                });
            } else {
                res.error('没有用户');
            }
        });
    }
);
/* 删除 用户 */
router.post('/deleteUser',
    function (req, res) {
        var param = req.body;
        User.remove({_id: param.id}, function (err, users) {
            if (err) {
                res.error(param.username + '此用户不存在');
            } else {
                res.success({
                    code: 200,
                    message: '删除用户成功'
                });
            }
        });
    }
);
router.delete('/deleteList',
    function (req, res) {
        res.success({
            code: 200,
            message: '删除'
        });
    });
router.post('/addList',
    public_up.single('img'),
    list.validate_list,
    function (req, res) {
        var param = req.body;
        param.timestamp = Date.now();
        param.url = req.file.path.replace(/public/,'').replace(/\\/g,'\/');
        var newList = new List(param);
        newList.save((err,newList)=>{
            if(err){
                console.log(err);
                res.error('添加新链接失败');
            }else {
                res.success({
                    code: 200,
                    data:newList,
                    message: '添加新链接成功'
                });
            }
        });
    });
router.post('/updateList',
    list.validate_list,
    function (req, res) {
        res.success({
            code: 200,
            message: '更新'
        });
    });
module.exports = router;

