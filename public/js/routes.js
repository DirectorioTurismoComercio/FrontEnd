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
      when('/signup',
      {
        templateUrl: 'templates/signup/signup-main.html',
        controller: 'SignupIndexController'
      }).
      when('/roles',
      {
        templateUrl: 'templates/signup/roles.html',
        controller: 'RoleController'
      }).
      when('/roleDescription',
      {
        templateUrl: 'templates/signup/role-description.html',
        controller: 'RoleDescriptionController'
      }).
      when('/user',
      {
        templateUrl: 'templates/user/user.html',
        controller: 'UserController'
      }).
       when('/signupMain',
      {
        templateUrl: 'templates/signup/signup-main.html',
        controller: 'SignupMainController'
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
        redirectTo:'/unal'
      });
  }]);
})();

