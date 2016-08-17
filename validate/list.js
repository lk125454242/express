/**
 * Created by Administrator on 2016/6/28.
 */
var mongoose = require('mongoose');
var _ = require('lodash');
var Redis = require('../config/server').Redis;//获取redis服务器

exports.validate_list = function (req, res, next) {
    var param = req.body;
    if(_.isArray(param.classify) && _.isEmpty(param.classify[0])){
        res.error('分类信息有误');
        return false;
    }
    if(_.isEmpty(param.title)){
        res.error('标题信息有误');
        return false;
    }
    if(_.isEmpty(param.url)){
        res.error('链接地址信息有误');
        return false;
    }
    next();
};