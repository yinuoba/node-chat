/**
 * 请求路由
 */

var check = require('./controllers/check');
var message = require('./controllers/message');
var user = require('./controllers/user');
var site = require('./controllers/site');


module.exports = function(app) {
	/**
	 * 首页
	 */
	app.get('/', site.index);

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
	 * 退出登录
	 */
	app.get('/logout', user.logout);
	/**
	 * Socket.io
	 */
	app.get('/check', check.index);
	app.get('/message', message.index);
};