window.onload = function() {
  var socket = null;
  var linkText = document.getElementById('linkText');
  var linkBid = document.getElementById('linkBid');
  document.getElementById('testLink').onclick = function() {
    if (!socket) {
      linkText.innerHTML = '正在连接到 ' + CHAT_HOST + ', 请稍后...';
      socket = io.connect(CHAT_HOST);
      socket.on('connect', function() {
        linkText.innerHTML = ':) 已成功连接!';
      });
      socket.on('error', function() {
        linkText.innerHTML = ':( 连接出错!';
      });
      socket.on('disconnect', function() {
        linkText.innerHTML = ':0 连接断开!';
      });
    }
  }
}