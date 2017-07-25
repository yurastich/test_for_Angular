;(function () {

  "use strict";

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