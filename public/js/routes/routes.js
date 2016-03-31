(function () {
    angular.module('gemStore')
        .config(function ($routeProvider) {
            $routeProvider
                .when('/personalData', {
                    templateUrl: 'templates/signup/personal-data.html',
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
                .when('/profileDescription/:idusuario', {
                    controller: 'SignupMainController',
                    templateUrl: 'templates/signup/description.html',
                })
                .when('/signin', {
                    //controller: 'SigninController',
                    templateUrl: 'templates/signin/signin.html',
                })
                .when('/signout', {
                    controller: 'SignoutController',
                    templateUrl: 'templates/signout/signout.html',
                })
                .when('/auth', {
                    controller: 'AuthController',
                    templateUrl: 'templates/auth/auth.html',
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
                .when('/comoFunciona', {
                    controller: 'ComoFuncionaController',
                    templateUrl: 'templates/signin/como_funciona.html'
                })
                .when('/index', {
                    templateUrl: 'templates/index.html',
                })
                .when('/home', {
                    controller: 'HomeController',
                    templateUrl: 'templates/home/home.html'
                })
                .when('/', {
                    redirectTo: '/signin'
                })
                .otherwise({
                    redirectTo: '/signin'
                });
        });
})();
