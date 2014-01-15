/**
 * websocket服务
 */
var chat = require('./chat');

module.exports = function(io, config){

	/**
	 * 配置各个环境的socket.io
	 */
	io.configure(ENVIROMENT, function(){
	  config.socketSetting(io);
	});

	/**
	 * 聊天频道
	 */
	chat(io);
	
};