/**
 * Created by Administrator on 2016/6/28.
 */

//检测cookie
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
//检测session
exports.equal = function (prop,msg) {
    return function (req, res, next) {
        var body = req.body;
        if (body[prop][0] === body[prop][1]) {
            next();
        }else {
            res.error(msg + '两次输入不一致');
        }
    }
};
//检测权限
exports.required = function (prop,msg) {
    return function (req, res, next) {
        if (/\S/.test(req.body[prop])) {
            next();
        }else {
            res.error(msg + '不能为空');
        }
    }
};