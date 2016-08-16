/**
 * Created by Administrator on 2016/8/16.
 */
exports.first_upper = function ( string ) {
    return string.replace(/\/(\w)/g,function(s){return s.slice(1).toUpperCase()})
};