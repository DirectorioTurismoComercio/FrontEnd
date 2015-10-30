(function() {
   angular.module('gemStore')
  .config(['$routeProvider',function($routeProvider) {
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
    /*  when('/user/:idUser',
      {
        templateUrl: 'templates/administracion-usuario/user_admin.html',
        controller: 'UserAdminController'
      }). */
      when('/user/problems',
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
        controller: 'ProblemsCreateController'
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
         when('/questionnaires',
      {
        controller: 'QuestionnaireController',
        templateUrl: 'templates/questionnaires/index.html',
      }).
         when('/questionnaires/questionnaire/:idQuestionnaire',
      {
        controller: 'QuestionsController',
        templateUrl: 'templates/questionnaires/questionnaire.html',
      }).
         when('/questionnaires/summary',
      {
        controller: 'QuestionnaireSummaryController',
        templateUrl: 'templates/questionnaires/summary.html',
      }).
         when('/solutions',//add pacho
      {
        controller: 'SolutionController',        
        templateUrl: 'templates/questionnaires/solutions.html',
      }).
         when('/solutions/detail',//add pacho
      {
        controller: 'SolutionDetailController',        
        templateUrl: 'templates/questionnaires/solution-detail.html',
      }).
         when('/rolquestionnaire',//add pacho
      {
        controller: 'RoleQuestionnaireController',        
        templateUrl: 'templates/questionnaires/roles.html',
      }).
         when('/actionquestionnaire',//add pacho
      {
        controller: 'ActionQuestionnaireController',        
        templateUrl: 'templates/questionnaires/action.html',
      }).     
         when('/auth',//Add by Pacho (Login)
      {
        controller: 'AuthController',        
        templateUrl: 'templates/auth/auth.html',
      }).     
         when('/prueba',//Add by Pacho (prueba)
      {
        controller: 'AController',        
        templateUrl: 'templates/datos.html',
      }).     
         when('/auth/changepass',//Add by Pacho (Cambio de Contraseña)
      {
        controller: 'ChangePassController',        
        templateUrl: 'templates/auth/changepass.html',
      }).     
         when('/auth/recovery',//Add by Pacho (Recuperar Contraseña envio correo)
      {
        controller: 'RecoveryController',        
        templateUrl: 'templates/auth/recoverypass.html',
      }).     
         when('/auth/forgotpass/:uid/:token',//Add by Pacho (Cambio contraseña despues del correo)
      {
        controller: 'ForgotPassController',        
        templateUrl: 'templates/auth/forgotpass.html',
      }).     
         when('/profileMain',//Add by Pacho Perfil
      {
        controller: 'ProfileMainController',        
        templateUrl: 'templates/profile/profile-main.html',
      }).     
         when('/profileUpdate',//Add by Pacho Perfil
      {
        controller: 'ProfileUpdateController',        
        templateUrl: 'templates/profile/profile-update.html',
      }).     
         when('/profileSearch',//Add by Pacho Perfil
      {
        controller: 'ProfileSearchController',        
        templateUrl: 'templates/profile/profile-search.html',
      }).     
         when('/profileSearchDetail',//Add by Pacho Perfil
      {
        controller: 'ProfileSearchDetailController',        
        templateUrl: 'templates/profile/profile-search-detail.html',
      }).     
      when('/index',
      { 
        templateUrl: 'templates/index.html',
      }).
      when('/',
      {
        redirectTo:'/signin'
      }).
      otherwise({
        redirectTo:'/signin'
      });
  }]);
})();

