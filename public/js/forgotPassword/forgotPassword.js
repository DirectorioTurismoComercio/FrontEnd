'use strict';

angular.module('forgotPassword', [])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/forgotpassword', {
                templateUrl: 'js/forgotPassword/forgotPassword.html',
                controller: 'forgotPasswordController'
            });
    });
