/**
 * 用户
 */

var logger = require('../commonjs/log').logger;
var mongodb = require('./db');

function User (user) {
	this.name = user.name;
	this.password = user.password;
	this.email = user.email;
}

module.exports = User;

/**
 * 保存一条用户记录
 */
User.prototype.save = function (callback) {
	var user = {
		name: this.name,
		password: this.password,
		email: this.email
	};
	
	// 打开数据库
	mongodb.open(function (err, db) {
		if(err) return callback(err);
		
		db.collection('users', function (err, collection) {
			if(err) {
				mongodb.close();
				return callback(err);
			}
			
			collection.insert(user, {safe: true}, function (err, user) {
				mongodb.close();
				if(err) return callback(err);
				callback(null, user[0]); // 成功
			});
		});
	});
};

/**
 * 查询给定名字的用户
 */
User.get = function (name, callback) {
	mongodb.open(function (err, db) {
		if(err) return callback(err);
		
		// 读取 users
		db.collection('users', function (err, collection) {
			if(err) {
				mongodb.close();
				return callback(err);
			}
			
			collection.findOne({name: name}, function (err, user) {
				mongodb.close();
				if(err) return callback(err);
				
				callback(null, user); // 成功
			});
		});
	});
};