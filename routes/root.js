/**
 * Created by Administrator on 2016/6/29.
 */
var express = require('express');
var mongoose = require('mongoose');
var _ = require('lodash');
var router = express.Router();

/*安装 mongoDB 中的所有modul  Schema*/
require('../mongodb/modules');
var User = mongoose.model('Users');
router.get('/', function(req, res, next) {
    res.render('index', { title: '用户中心' });
});
router.get('/getUser',
    function (req, res) {
        User.find({},function (err, users) {
            if(users.length){
                res.success({
                    code:200,
                    users:users
                });
            }else {
                res.error('没有用户');
            }
        });
    }
);
router.post('/deleteUser',
    function (req, res) {
        var param = req.body;
        User.remove({_id:param.id},function (err, users) {
            if(err){
                res.error(param.username + '此用户不存在');
            }else {
                res.success({
                    code:200,
                    message:'删除用户成功'
                });
            }
        });
    }
);
module.exports = router;

