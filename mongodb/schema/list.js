/**
 * Created by Administrator on 2016/6/27.
 */
var mongoose = require('mongoose');
var _ = require('lodash');
var Schema = mongoose.Schema;
var list = {
    title:{
        type:String,
        required:'标题不能为空'
    },
    url:{
        type:String,
        required:'链接地址不能为空'
    },
    img:{
        type:String,
        default:'images/head.png'
    },
    timestamp:{
        type:Number,
        required:'时间戳不能为空'
    },
    classify:{
        type:Array,
        required:'至少需要一个分类'
    }
};
exports.listSchema = mongoose.model('List',list);