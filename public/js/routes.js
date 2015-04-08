(function() {
    //this module depends on
    // 'store-products' module
    // 'ngRoute'
  angular.module('gemStore')
  //how to use this with directives?
  .config(['$routeProvider',function($routeProvider) {
    // debugger;
    $routeProvider.
    when('/home',
      {
        templateUrl: 'templates/home/mainPage.html',
        controller: 'MainPageController'
      }).
      when('/roles',
      {
        templateUrl: 'templates/signup/roles.html',
        controller: 'RoleController'
      }).
      when('/user',
      {
        templateUrl: 'templates/user/user.html',
        controller: 'UserController'
      }).
      
      when('/index',
      {
        templateUrl: 'templates/index.html',
      }).
      when('/unal',
      {
        templateUrl: 'templates/unal.html',
      }).
      otherwise({
        redirectTo:'/home'
      });
  }]);
})();