
  SocketFactory.$inject = ["$websocket"];;(function () {

  "use strict";

  MainConfig.$inject = ["$urlRouterProvider", "$locationProvider"];
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
;(function () {

  "use strict";

  aboutController.$inject = ["$rootScope"];
  AboutConfig.$inject = ["$stateProvider"];
  angular
    .module("soc.about", [])
    .controller("AboutCtrl", aboutController)
    .config(AboutConfig)


  // @ngInject
  function aboutController($rootScope) {
    var s = this;
    $rootScope.Page = "about";


  }

  // @ngInject
  function AboutConfig($stateProvider) {
    $stateProvider
      .state("about",{
        url: "/about",
        templateUrl: "app/about/about.html",
        controller: "AboutCtrl"
      })
  }

})();
angular
    .module("soc.header", [])
    .controller("HeaderCtrl", headerController)



  // @ngInject
  function headerController() {
    var s = this;



  }
  

;(function () {

  "use strict";

  HomeController.$inject = ["$rootScope", "my_socket"];
  HomeRun.$inject = ["$websocket"];
  HomeConfig.$inject = ["$stateProvider"];
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
;(function () {

  "use strict";

  RegistrationController.$inject = ["$rootScope", "$scope", "ConnectSrv"];
  RegistrationConfig.$inject = ["$stateProvider"];
  ConnectService.$inject = ["$http"];
  angular
    .module("soc.registration", [])
    .controller("RegistrationCtrl", RegistrationController)
    .config(RegistrationConfig)
    .service("ConnectSrv", ConnectService)



  // @ngInject
  function RegistrationController($rootScope,$scope, ConnectSrv) {
    $rootScope.Page = "registration";

    $scope.SaveUser = function () {
      var User = {
        name: $scope.name,
        email: $scope.email,
        password: $scope.password,
        birthday: $scope.birthday,
        language: $scope.language
      };

      var response = ConnectSrv.AddUser(User);
      response.then(function (data) {
        if (data.data == "1") {
          alert("User Created !");
        }
        else if (data.data == "-1") {
          alert("user alraedy present !");
        }
        else {
          clearFields();
          alert("Invalid data entered !");
        }
      });
    }

    function clearFields() {
      $scope.name = "";
      $scope.email = "";
      $scope.password = "";
      $scope.birthday = "";
      $scope.language = "";
    }

  }

  // @ngInject
  function RegistrationRun() {

  }

  function ConnectService ($http) {

    this.AddUser = function (User) {
      var response = $http({
        method: "post",
        url: "http://dev.join2city.com/api/registration",
        data: JSON.stringify(User),
        dataType: "json"
      });
      return response;
    }

  };

  // @ngInject
  function RegistrationConfig($stateProvider) {
    $stateProvider
      .state("registration",{
        url: "/",
        templateUrl: "app/registration/registration.html",
        controller: "RegistrationCtrl"
      })

  }

})();
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