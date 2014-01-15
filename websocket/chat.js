/**
 * 聊天频道
 */

module.exports = function(io){
	/**
	 * 建立chat这一namespace
	 */
	var chat = io.of('/chat');

	chat.on('connection', function (socket) {
		/**
		 * 监听客户端发送的消息
		 */
		socket.on('clientchat', function(data){

		});

		/**
		 * 监听客户端下线消息
		 */
		socket.on('disconnect', function(data){

		});
	});
}