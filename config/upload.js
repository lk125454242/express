/**
 * Created by Administrator on 2016/8/17.
 */
var multer = require('multer');
var config = require('./config');

var Limits = {
    fieldNameSize: 100,//文件名长度限制
    fieldSize: 102400,//非文件字段大小限制100kb
    fileSize: 204800,//文件大小限制200kb
    files:1,//最大文件数量
    fields:20,//最大非文件字段数量
    parts:21,//最大文件 + 字段个数
    headerPairs:200//最大header头字段
};
var Storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        cb(null, config.public_upload)
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        cb(null,  Date.now() + '-' + file.originalname)
    }
});

exports.public_upload = multer({
    storage: Storage,
    limits: Limits,
    fileFilter: function (req, file, cb) {
        if(/image/.test(file.mimetype)){
            cb(null, config.public_upload);
        }else {
            cb(null, false);
        }
    }
});