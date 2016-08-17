var express = require('express');
var moment = require('moment');
var router = express.Router();
var mongoose = require('mongoose');
var List = mongoose.model('List');

router.get('/', function(req, res, next) {
  res.redirect('/register.html');
});

var tt = 0;
router.get('/time', function(req, res, next) {
  res.set('Content-Type','text/event-stream');
  res.write("data: {\"now\":"+Date.now()+"}\r\n\r\n");
  res.end();
});
router.search('/search', function (req, res) {
  res.success({
    code: 200,
    message: '搜索'
  });
});
router.get('/getList',function (req, res) {
  List.find({},function (err, lists) {
    res.success({
      code: 200,
      data:lists,
      message: '成功'
    });
  })
});
module.exports = router;


