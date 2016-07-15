/**
 * Created by Administrator on 2016/6/28.
 */
var express = require('express'),
    res = express.response;
res.message = function (msg,type) {
    var session = this.req.session;
    session.messages = session.message || [];
    session.messages.push({
        type:type || 'info',
        string:msg
    })
};
res.success = function (obj) {
    this.status(200).json(obj);
};
res.error = function (msg) {
    this.set({
        'Content-Type': 'application/json',
        'Content-Length': '' + msg.length,
        'ETag': Math.floor(Math.random() * 1000 + 1000)
    });
    this.status(200).json({
        code:400,
        message:msg
    });
};
module.exports = function (req, res, next) {
   /* res.locals.messages = req.session.messages || [];
    res.locals.removeMessages = function () {
        req.session.message = [];
    };*/
    next();
};

