/*插件*/
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
var _ = require('lodash');
/* 启动所有服务链接 */
require('./config/server');
var wx = require('./config/wx');
/*安装 mongoDB 中的所有modul  Schema*/
require('./mongodb/modules');

/*路由*/
var routes = require('./routes/index');
var users = require('./routes/users');
var root = require('./routes/root');

/*扩展*/
var extendRes = require('./extend/res');

var key = require('./config/config').secret;//获取密码
var cookies_options = require('./config/cookies').cookie_options;
var Redis = require('./config/server').Redis;
/*应用*/
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());//解析json
app.use(bodyParser.urlencoded({extended: false}));//解析urlcode
app.use(cookieParser(key));
app.use(session({
    /*key:'Auth',//储存的cookie 默认为 connect.sid */
    //store:Redis,//储存到redis里面 个人表示没有必要
    secret: key,//加密的字符串
    //name: 'Auth',//表示cookie的name，默认cookie的name是：connect.sid
    resave: false,//是指每次请求都重新设置session cookie
    saveUninitialized: true,//是指无论有没有session cookie，每次请求都设置个session cookie ，默认给个标示为 connect.sid。
    cookie: _.assign({maxAge: 14400000 }, cookies_options)
}));
require('./mysql/tables/user');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/lyk', root);
//解决跨域问题
app.use(cors());
app.use('/', routes);
app.use('/users', users);
app.use('/wx',function (req, res) {
    res.send(req.query.echostr);
});
/* 扩展res */
app.use(extendRes);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
module.exports = app;
