;(function () {

  "use strict";

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