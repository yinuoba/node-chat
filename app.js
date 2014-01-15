/**
 * app.js for node-chat
 * @type {[type]}
 */

global.ENVIROMENT = 'development';

var express = require('express');
var http = require('http');
var path = require('path');
var MongoStore = require('connect-mongo')(express);
var fs = require('fs');

var app = express();

var server = require('http').createServer(app);

var io = require('socket.io').listen(server);
var socket = require('./websocket/socket');

var config = require('./config')[ENVIROMENT];

// flash 是一个在 session 中用于存储信息的特定区域
// 典型的应用是结合重定向的功能，确保信息是提供给下一个被渲染的页面
var flash = require('connect-flash');

var log = require('./commonjs/log');

var logger = log.logger;
logger.setLevel(config["log_level"]);

// 配置日志
log.use(app);

app.use(express.favicon());
app.set('port', config["port"]);
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
	secret: config.cookieSecret,
	key: config.db,
	cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}, // 30 days
	store: new MongoStore({db: config.db})
}));
app.use(app.router);

var routes = require('./routes');
routes(app);

// 启动socket服务
socket(io, config);

server.listen(app.get('port'), function(){
	logger.info('Express server listening on port ' + app.get('port'));
});