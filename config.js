/**
 * 项目配置
 * @type {Object}
 */
module.exports = {
	"development": {
		"port": 11223,
		"log_level": "INFO",
		"socketSetting": devSocketSetting
	},
	"product": {
		"port": 11223,
		"log_level": "ERROR",
		"socketSetting": proSocketSetting
	}
};

/**
 * 开发环境配置
 * @param  {[type]} io [description]
 * @return {[type]}    [description]
 */
function devSocketSetting(io) {
	io.enable('browser client etag');
	io.set('log level', 3);
	// socket.io降级处理配置
	io.set('transports', [
		'websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling'
	]); // socket.io降级处理配置
}

/**
 * 生产环境配置
 * @param  {[type]} io [description]
 * @return {[type]}    [description]
 */
function proSocketSetting(io) {
	io.enable('browser client minification'); // send minified client
	io.enable('browser client etag'); // apply etag caching logic based on version number
	io.enable('browser client gzip'); // gzip the file
	io.set('log level', 1); // reduce logging
	io.set('heartbeats', false);
	io.set('transports', [
		'websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling'
	]); // socket.io降级处理配置
}