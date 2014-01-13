var mongodb = require('../config')[ENVIROMENT];

var DB = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

module.exports = new DB(mongodb.db, new Server(mongodb.host, Connection.DEFAULT_PORT), {safe: true});