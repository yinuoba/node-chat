/**
 * 检测功能，用于检测项目是否部署成功
 */

var chatTool = require('../commonjs/chatTool.js');
var config = require('../config')[ENVIROMENT];
var logger = require('../commonjs/log').logger;

exports.index = function(req, res) {
	var IPv4 = chatTool.getIPv4ByName('eth0');
	var port = config.port;
	res.render(
		'check/index', {
			title: 'websocket服务器检测',
			ip: IPv4,
			port: port
		}
	);
}