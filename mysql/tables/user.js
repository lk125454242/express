/**
 * Created by Administrator on 2016/9/8 0008.*/
/*
var Sequelize = require('sequelize');
var sequelize = require('../../config/server').sequelize;
var User = sequelize.define('user', {
    uid:{
        type: Sequelize.INTEGER, //字段类型 int, 32 bit integer
        primaryKey: true, // 定义主键
        autoIncrement: true, //自动递增,
        comment: "主键，自增"

    },
    name: {
        'type': Sequelize.STRING, // 字段类型
        'allowNull': false,         // 是否允许为NULL
        'unique': true              // 字段是否 唯一
    },
    password: Sequelize.STRING,
    mail: Sequelize.STRING
},{
    timestamps: true,
    freezeTableName: true
});

/!* TYPE:
 Sequelize.STRING(64)
 sequelize.INTEGER
 Sequelize.CHAR(10)

 *!/
/!* 增加*!/
User.create({
    name: 'XiaoMing2',
    password: '1234567890',
    mail: 'xiaoming@qq.com'
}).then(function(result){
    console.log('inserted XiaoMing ok');
}).catch(function(err){
    console.log('inserted XiaoMing error');
    console.log(err.message);

});
/!* 删除 *!/
User.destroy({
    where:{
        name:{
            $like:'Zhang%'
        }
    }
}).then(function(result){
    console.log('destroy user');
    console.log(result);
});
/!* 更改 *!/
User.update({
    password:'12'
},{
    where:{
        name:{
            $like:'Xiao%'
        }
    }
}).then(function(result){
    console.log('updated user');
    console.log(result);
});
/!* 查询 *!/
User.findAll({
    where:{
        name:{
            $like:'Zhang%'
        }
    }
}).then(function(result){
    console.log('query all users');
    for (var i = 0, usr; usr = result[i++];) {
        console.log('nae=' + usr.name + ', password=' + usr.password + ', mail=' + usr.mail);
    }
});
*/
