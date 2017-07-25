angular
  .module("soc.socket", ['btford.socket-io'])
  .factory("my_socket", SocketFactory)



  // @ngInject
  function SocketFactory($websocket) {

      // var myIoSocket = io.connect('http://dev.join2city.com/api/');
      //
      // mySocket = socketFactory({
      //   ioSocket: myIoSocket
      // });
      //
      // return mySocket;

    var dataStream = $websocket('ws://91.239.234.74:5241/?id=1070&sessionHash=fafc14091533c98071525895831a5988');

    var collection = ["asdasd","asdasd"];

    dataStream.onMessage(function(message) {
      collection.push(JSON.parse(message.data));
    });

    var methods = {
      collection: collection,
      get: function() {
        dataStream.send(JSON.stringify({ action: 'get' }));
      }
    };

    return methods;

  }