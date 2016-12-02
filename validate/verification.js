/**
 * Created by Administrator on 2016/6/28.
 */

//检测特殊字符
exports.character = function (prop,msg) {
    return function (req, res, next) {
        var value = req.body[prop];
        if (/\W/.test(value) || /_/.test(value)) {
            res.error(msg + '不能包含特殊字符');
        }else {
            next();
        }
    }
};
//检测相等
exports.equal = function (prop,msg) {
    return function (req, res, next) {
        var body = req.body;
        if (body[prop][0] === body[prop][1]) {
            body[prop] = body[prop][0];
            next();
        }else {
            res.error(msg + '两次输入不一致');
        }
    }
};
//检测必填
exports.required = function (prop,msg) {
    return function (req, res, next) {
        if (/\S/.test(req.body[prop])) {
            next();
        }else {
            res.error(msg + '不能为空');
        }
    }
};
//检测空白
exports.noBlank = function (prop,msg) {
    return function (req, res, next) {
        if (!/\s/.test(req.body[prop])) {
            next();
        }else {
            res.error(msg + '不能包含空白');
        }
    }
};
//检测长度
exports.length = function (prop, min, max ,msg) {
    return function (req, res, next) {
        var value = req.body[prop];
        if(!value){
            res.error(msg + '不能为空');
            return false;
        }
        if(typeof value !== 'string') value = value[0];
        var length = value.length;
        if (max && length > max) {
            res.error(msg + '长度不能超过' + max + '位');
        } else if (min && length < min) {
            res.error(msg + '长度不能少于' + min + '位');
        } else {
            next();
        }
    };
};
//检测包含字母
exports.containWord = function (prop, msg) {
    return function (req, res, next) {
        if (/[A-z]/.test(req.body[prop])) {
            next();
        }else {
            res.error(msg + '至少有一位字母');
        }
    };
};
//检测包含数字
exports.containNumber = function (prop, msg) {
    return function (req, res, next) {
        if (/\d/.test(req.body[prop])) {
            next();
        }else {
            res.error(msg + '至少有一位数字');
        }
    };
};

