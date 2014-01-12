/**
 * app.js for node-chat
 * @type {[type]}
 */

global.ENVIROMENT = 'development';

var http = require('http');
var path = require('path');
var fs = require('fs');

var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var config = require('./config')[ENVIROMENT];

var routes = require('./routes');
var log = require('./commonjs/log');

var logger = log.logger;
logger.setLevel(config["log_level"]);

// 配置日志
log.use(app);

app.set('port', config["port"]);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.register('.html', require('ejs'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

// 配置socket.io
io.configure(EVN_NAME, function(){
  config.socketSetting(io);
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

server.listen(app.get('port'), function(){
	logger.info('Express server listening on port ' + app.get('port'));
});