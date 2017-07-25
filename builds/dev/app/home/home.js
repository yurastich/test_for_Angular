;(function () {

  "use strict";

  angular
    .module("soc.home", [])
    .controller("HomeCtrl", HomeController)
    .config(HomeConfig)
    .run(HomeRun)



  // @ngInject
  function HomeController($rootScope, my_socket) {
    $rootScope.Page = "home";
    var s = this;
    console.log(my_socket)


  }

  // @ngInject
  function HomeRun($websocket) {
    // var ws = $websocket.$new({
    //   url: 'ws://91.239.234.74:5241/?id=1070&sessionHash=fafc14091533c98071525895831a5988',
    //   mock: true
    // });
    //
    // ws.$on('$open', function () {
    //   ws.$emit('a test', 'hello world');
    //   ws.$emit('another test', {
    //     my: 'awesome data'
    //   });
    // });
    //
    // ws.$on('a test', function (message) {
    //   console.log(message); // 'hello world'
    // });
    //
    // ws.$on('another test', function (message) {
    //   console.log(message.my); // 'awesome data'
    // });



  }

  // @ngInject
  function HomeConfig($stateProvider) {
    $stateProvider
      .state("home",{
        url: "/",
        templateUrl: "app/home/home.html",
        controller: "HomeCtrl"
      })

  }

})();