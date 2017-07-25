;(function () {

  "use strict";

  angular
    .module("soc", [
      "ui.router",
      'btford.socket-io',
      'ngWebSocket',
      "ui.bootstrap",
      "soc.socket",
      "soc.home",
      "soc.about",
      "soc.header",
      "soc.registration"
    ])
    .controller("MainCtrl", MainController)
    .config(MainConfig)
    // .factory("Socket", SocketFactory)



  // // @ngInject
  // function SocketFactory(socketFactory) {
  //
  //   return socketFactory();
  //
  // }


  // @ngInject
  function MainController() {
    var s = this;
  }



  // @ngInject
  function MainConfig($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise("/");
    $locationProvider.hashPrefix('');
  }

})();