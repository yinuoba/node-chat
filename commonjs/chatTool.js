var os = require('os');
var ifaces = os.networkInterfaces();
// console.info(ifaces);
module.exports = {
  //获取本机所有的IPv4
  getIPv4: function(){
    var ipArr = [];
    for (var dev in ifaces) {
      // console.log(dev);
      var alias = 0;
      ifaces[dev].forEach(function(details){
        if (details.family == 'IPv4') {
          ipArr.push({
            name: dev + (alias ? ':' + alias : ''),
            address: details.address
          });
          ++ alias;
        }
      });
    }
    return ipArr;
  },
  //通过名称取IPv4
  getIPv4ByName: function(name){
    var ipArr = this.getIPv4();
    var address = null;
    ipArr.forEach(function(item){
      if(item.name === name){
        address = item.address;
      }
    });
    return address;
  }
};