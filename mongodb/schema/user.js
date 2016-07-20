/**
 * Created by Administrator on 2016/6/27.
 */
var mongoose = require('mongoose');
var _ = require('lodash');
var Schema = mongoose.Schema;
var user = {
    username:{
        type:String,
        required:'用户名不能为空'
    },
    password:{
        type:String,
        required:'密码不能为空'
    },
    nickname:{
        type:String,
        default:'匿名'
    },
    birthday:{
        type:Number,
        default:315504000000
    },
    email:{
        type:String,
        default:''
    },
    head:{
        type:String,
        default:'/images/head.png'
    },
    sex:Boolean,
    phone:Number,
    last_login:{
        time:{
            type:Number,
            default:Date.now()
        }
    },
    root:{
        type:Number,
        default:0
    }
};
var userSchema = new Schema(user);

userSchema.findAll = function get(callback) {
    users.find({}, function(err, doc){
        if (err) {
            return callback(err, null);
        }
        return callback(err, _.filter(doc,'nickname','_id'));
    });
};
userSchema.methods.dataInfo = function (filter) {
    users.find(filter, function(err, doc){
        if (err) {

            return callback(err, null);

        }
        return callback(err, doc);
    });
    return {
        nickname:this.nickname,
        birthday:this.birthday,
        head:this.head,
        _id:this._id
    }
};
exports.userSchema = mongoose.model('Users',user);