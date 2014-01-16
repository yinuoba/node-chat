/**
 * 广播消息
 */

var logger = require('../commonjs/log').logger;

exports.index = function(req, res){
  var data = req.query;
  
  if(!data.userid){
    logger.error('error: 缺少参数!');
  }else{
    logger.info(data);
  }
}