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
       when('/personalData',
      {
        templateUrl: 'templates/signup/personal-data.html',
        controller: 'SignupMainController'
      }).
       when('/businessData',
      {
        templateUrl: 'templates/signup/business-data.html',
        controller: 'SignupMainController'
      }).
         when('/profileSummary',
      {
        templateUrl: 'templates/signup/profile-summary.html',
        controller: 'SignupMainController'
      }).
      when('/search',
      {
        templateUrl: 'templates/search/search.html',
        controller: 'SearchController'
      }).
      when('/user/:idUser',
      {
        templateUrl: 'templates/administracion-usuario/user_admin.html',
        controller: 'UserAdminController'
      }).
      when('/user/:idUser/problem',
      {
        templateUrl: 'templates/problems/index.html',
        controller: 'ProblemsIndexController'
      }).
      when('/user/:idUser/problem/new',
      {
        templateUrl : "templates/problems/new.html",
        controller:  "ProblemsCreateController"
      }).
      when('/user/:idUser/problem/:idProblem',
      {
        templateUrl: 'templates/problems/show.html',
        controller: 'ProblemsShowController'
      }).
      when('/user/:idUser/problem/:idProblem/edit',
      {
        templateUrl: 'templates/problems/edit.html',
        controller: 'ProblemsEditController'
      }).
       when('/socialNetworks/:idusuario', {
    
       controller: 'socialNetworksController',
       templateUrl: 'templates/signup/user-social-networks.html'
       }).
       when('/profileDescription/:idusuario',
      {
        controller: 'SignupMainController',
        templateUrl: 'templates/signup/description.html',
      }).
       when('/signin',
      {
        controller: 'SigninController',
        templateUrl: 'templates/signin/signin.html',
      }).
         when('/signout',
      {
        controller: 'SignoutController',
        templateUrl: 'templates/signout/signout.html',
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
        redirectTo:'/signup'
      });
  }]);
})();

