/**
 * 请求路由
 */

var check = require('./controllers/check');
var message = require('./controllers//message');

module.exports = function(app) {
	// 首页
  app.get('/check', check.index);
  app.get('/message', message.index);
};