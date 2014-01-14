/**
 * User controller
 */

var logger = require('../commonjs/log').logger;
var User = require('../models/user');
var crypto = require('crypto'); // 生成散列值来加密密码

exports.index = function(req, res){
	// index
};

/**
 * 注册
 */
exports.reg = function (req, res) {
	var name, password, password_repeat, email, md5, user;
	
	if(req.method === 'GET') {
		res.render('user/reg', {
			title: '注册',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	} else if(req.method === 'POST') {
		name = req.body.name;
		password = req.body.password;
		password_repeat = req.body['password-repeat'];
		email = req.body.email;
		
		// 检验两次输入的密码是否一致
		if(password !== password_repeat) {
			req.flash('error', '两次输入的密码不一致！');
			console.log('两次输入的密码不一致！');
			return res.redirect('/reg');
		}
		md5 = crypto.createHash('md5');
		password = md5.update(password).digest('hex');
		newUser = new User({
			name: name,
			password: password,
			email: email
		});
		
		// 检查用户是否存在
		User.get(newUser.name, function (err, user) {
			if(user) {
				req.flash('error', '用户已存在！');
				return res.redirect('/reg');
			}
			// 如果不存在，则新增用户
			newUser.save(function (err, user) {
				if(err) {
					req.flash('error', err);
					return res.redirect('/reg');
				}
				
				req.session.user = user;
				req.flash('success', '注册成功！');
				res.redirect('/');
			});
		});
	}
};

/**
 * 登录
 */
exports.login = function (req, res) {
	var name, md5, password;
	
	if(req.method === 'GET') {
		res.render('user/login', {
			title: '登录',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	} else if(req.method === 'POST') {
		name = req.body.name;
		md5 = crypto.createHash('md5');
		password = md5.update(req.body.password).digest('hex');
		User.get({name: name}, function (err, user) {
			if(!user) {
				req.flash('error', '用户不存在！');
				return res.redirect('/login');
			}
			
			if(user.password !== password) {
				req.flash('error', '密码错误！');
				return res.redirect('/login');
			}
			
			req.session.user = user;
			req.flash('success', '登录成功！');
			res.redirect('/');
		});
	}
};

/**
 * 退出登录
 */
exports.logout = function (req, res) {
	req.session.user = null;
	req.flash('success', '登出成功！');
	res.redirect('/');
};

/**
 * 个人中心
 */
exports.userCenter = function (req, res) {
	var _data = {
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	}
	if(!req.params.id) {
		if(req.session.user) {
			_data.user = req.session.user;
			res.render('user/user_center', _data);
		} else {
			res.redirect('/login');
		}
	}
	User.get({_id: req.params.id}, function (err, user) {
		if(!user) {
			_data.error = '用户不存在！';
			_data.user = null;
			res.render('user/user_center', _data);
		}
		_data.user = user;
		res.render('user/user_center', _data);
	});
};