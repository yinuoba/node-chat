/**
 * 请求路由
 */

var check = require('./controllers/check');

module.exports = function(app) {
	// 首页
  app.get('/check', check.index);
};