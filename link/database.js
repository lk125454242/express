/**
 * Created by Administrator on 2016/6/29.
 */
var mongo = {
    username:'',
    password:'',
    hostname:'localhost',
    port:'27017',
    databasename:'users'
};
exports.mongo = (function (mongo) {
    if(mongo.username){
        return (
            'mongodb://' +
            mongo.username + ':' +
            mongo.password + '@' +
            mongo.hostname + ':' +
            mongo.port + '/' +
            mongo.databasename
        )
    }else {
        return (
            'mongodb://' +
            mongo.hostname + ':' +
            mongo.port + '/' +
            mongo.databasename
        )
    }
})(mongo);












