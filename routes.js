/**
 * 请求路由
 */

var check = require('./controllers/check');
var message = require('./controllers/message');
var user = require('./controllers/user');

module.exports = function(app) {
	/**
	 * 首页
	 */
	app.get('/', function (req, res) {
		res.render('index', {
			title: '即时聊天 - 首页',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});
	
	/**
	 * 注册
	 */
	app.get('/reg', user.reg);
	
	/**
	 * 注册请求
	 */
	app.post('/reg', user.reg);
	
	/**
	 * 登录
	 */
	app.get('/login', user.login);
	
	/**
	 * 登录请求
	 */
	app.post('/login', user.login);
	
	/**
	 * Socket.io
	 */
	app.get('/check', check.index);
	app.get('/message', message.index);
};