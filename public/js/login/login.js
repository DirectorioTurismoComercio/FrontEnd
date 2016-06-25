'use strict';

angular.module('login', [])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'js/login/login.html',
                controller: 'loginController'
            });
    });