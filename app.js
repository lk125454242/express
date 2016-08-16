/*插件*/
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

/* 启动所有服务链接 */
require('./config/server');
/*安装 mongoDB 中的所有modul  Schema*/
require('./mongodb/modules');

/*路由*/
var routes = require('./routes/index');
var users = require('./routes/users');
var root = require('./routes/root');

/*扩展*/
var extendRes = require('./extend/res');

var key = require('./config/config').secret;//获取密码

var Redis = require('./config/server').Redis;
/*应用*/
var app = express();
//解决跨域问题
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    //res.header("X-Powered-By",' 3.2.1');
    //res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser(key));
app.use(session({
    /*key:'Auth',//储存的cookie 默认为 connect.sid */
    //store:Redis,//储存到redis里面 个人表示没有必要
    secret: key,//加密的字符串
    //name: 'Auth',//表示cookie的name，默认cookie的name是：connect.sid
    resave: false,//是指每次请求都重新设置session cookie
    saveUninitialized: true,//是指无论有没有session cookie，每次请求都设置个session cookie ，默认给个标示为 connect.sid。
    cookie: {
        maxAge: 14400000, //4个小时
        httpOnly: true, //浏览器禁止访问
        path: '/', //此域名下全部可使用
        secure: false//不需要使用https请求
    }
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/lyk', root);

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
