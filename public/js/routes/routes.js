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
                .when('/login/changepass', {
                    controller: 'ChangePassController',
                    templateUrl: 'templates/auth/changepass.html',
                    required_roles: 'user'
                })
                .when('/login/recovery', {
                    controller: 'RecoveryController',
                    templateUrl: 'templates/auth/recoverypass.html',
                })
                .when('/login/forgotpass/:uid/:token', {
                    controller: 'ForgotPassController',
                    templateUrl: 'templates/auth/forgotpass.html',
                })
                .when('/profileMain', {
                    controller: 'ProfileMainController',
                    templateUrl: 'templates/profile/accountInfo.html',
                    required_roles: 'user'
                })
                .when('/profileUpdate', {
                    controller: 'ProfileUpdateController',
                    templateUrl: 'templates/profile/profile-update.html',
                    required_roles: 'user'
                })
                .when('/index', {
                    templateUrl: 'templates/index.html',
                })
                .when('/search', {
                    controller: 'SearchController',
                    templateUrl: 'js/search/search.html'
                })
                .when('/', {
                    redirectTo: '/home'
                })
                .otherwise({
                    redirectTo: '/home'
                });
        });
})();
