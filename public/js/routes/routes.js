(function () {
    angular.module('gemStore')
        .config(function ($routeProvider) {
            $routeProvider
                .when('/home', {
                    templateUrl: 'templates/home/mainPage.html',
                    controller: 'MainPageController'
                })
                .when('/roles', {
                    templateUrl: 'templates/signup/roles.html',
                    controller: 'RoleController'
                })
                .when('/personalData', {
                    templateUrl: 'templates/signup/personal-data.html',
                    controller: 'SignupMainController'
                })
                .when('/businessData', {
                    templateUrl: 'templates/signup/business-data.html',
                    controller: 'SignupMainController'
                })
                .when('/profileSummary', {
                    templateUrl: 'templates/signup/profile-summary.html',
                    controller: 'SignupMainController'
                })
                .when('/search', {
                    templateUrl: 'templates/search/search.html',
                    controller: 'SearchController'
                })
                .when('/user/problems', {
                    templateUrl: 'templates/problems/index.html',
                    controller: 'ProblemsIndexController'
                })
                .when('/user/:idUser/problem/new', {
                    templateUrl: "templates/problems/new.html",
                    controller: "ProblemsCreateController"
                })
                .when('/user/:idUser/problem/:idProblem', {
                    templateUrl: 'templates/problems/show.html',
                    controller: 'ProblemsShowController'
                })
                .when('/user/:idUser/problem/:idProblem/edit', {
                    templateUrl: 'templates/problems/edit.html',
                    controller: 'ProblemsCreateController'
                })
                .when('/socialNetworks/:idusuario', {
                    controller: 'socialNetworksController',
                    templateUrl: 'templates/signup/user-social-networks.html'
                })
                .when('/profileDescription/:idusuario', {
                    controller: 'SignupMainController',
                    templateUrl: 'templates/signup/description.html',
                })
                .when('/signin', {
                    controller: 'SigninController',
                    templateUrl: 'templates/signin/signin.html',
                })
                .when('/signout', {
                    controller: 'SignoutController',
                    templateUrl: 'templates/signout/signout.html',
                })
                .when('/questionnaires', {
                    controller: 'QuestionnaireController',
                    templateUrl: 'templates/questionnaires/index.html',
                })
                .when('/questionnaires/questionnaire/:idQuestionnaire', {
                    controller: 'QuestionsController',
                    templateUrl: 'templates/questionnaires/questionnaire.html',
                })
                .when('/questionnaires/summary', {
                    controller: 'QuestionnaireSummaryController',
                    templateUrl: 'templates/questionnaires/summary.html',
                })
                .when('/solutions', {
                    controller: 'SolutionController',
                    templateUrl: 'templates/questionnaires/solutions.html',
                })
                .when('/solutions/detail', {
                    controller: 'SolutionDetailController',
                    templateUrl: 'templates/questionnaires/solution-detail.html',
                })
                .when('/rolquestionnaire', {
                    controller: 'RoleQuestionnaireController',
                    templateUrl: 'templates/questionnaires/roles.html',
                })
                .when('/actionquestionnaire', {
                    controller: 'ActionQuestionnaireController',
                    templateUrl: 'templates/questionnaires/action.html',
                })
                .when('/auth', {
                    controller: 'AuthController',
                    templateUrl: 'templates/auth/auth.html',
                })
                .when('/prueba', {
                    controller: 'AController',
                    templateUrl: 'templates/datos.html',
                })
                .when('/auth/changepass', {
                    controller: 'ChangePassController',
                    templateUrl: 'templates/auth/changepass.html',
                    required_roles: 'user'
                })
                .when('/auth/recovery', {
                    controller: 'RecoveryController',
                    templateUrl: 'templates/auth/recoverypass.html',
                })
                .when('/auth/forgotpass/:uid/:token', {
                    controller: 'ForgotPassController',
                    templateUrl: 'templates/auth/forgotpass.html',
                })
                .when('/profileMain', {
                    controller: 'ProfileMainController',
                    templateUrl: 'templates/profile/profile-main.html',
                    required_roles: 'user'
                })
                .when('/profileUpdate', {
                    controller: 'ProfileUpdateController',
                    templateUrl: 'templates/profile/profile-update.html',
                    required_roles: 'user'
                })
                .when('/profileSearch', {
                    controller: 'ProfileSearchController',
                    templateUrl: 'templates/profile/profile-search.html',
                    required_roles: 'user'
                })
                .when('/profileSearchDetail', {
                    controller: 'ProfileSearchDetailController',
                    templateUrl: 'templates/profile/profile-search-detail.html',
                    required_roles: 'user'
                })
                .when('/profileConections', {
                    controller: 'ConexionesListController',
                    templateUrl: 'templates/profile/profile-conexiones.html',
                    required_roles: 'user'
                })
                .when('/conexionMain', {
                    controller: 'ConexionMainController',
                    templateUrl: 'templates/conexiones/conexiones-main.html',
                    required_roles: 'user',
                })
                .when('/comoFunciona', {
                    controller: 'ComoFuncionaController',
                    templateUrl: 'templates/signin/como_funciona.html'
                })
                .when('/index', {
                    templateUrl: 'templates/index.html',
                })
                .when('/', {
                    redirectTo: '/signin'
                })
                .otherwise({
                    redirectTo: '/signin'
                });
        });
})();
