/**
 * 检测功能，用于检测项目是否部署成功
 */

var chatTool = require('../commonjs/chatTool.js');

exports.index = function(req, res) {
	var IPv4 = chatTool.getIPv4ByName('eth0');
	var port = config[ENVIROMENT].port;
	res.render(
		'check/index.html', {
			title: 'websocket服务器检测',
			ip: IPv4,
			port: port
		}
	);
}