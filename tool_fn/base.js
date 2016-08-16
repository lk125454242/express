/**
 * Created by Administrator on 2016/8/16.
 */
exports.first_upper = function ( string ) {
    return string.replace(/\/(\w)/g,function(s){return s.slice(1).toUpperCase()})
};
exports.randomString =  function (len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
};