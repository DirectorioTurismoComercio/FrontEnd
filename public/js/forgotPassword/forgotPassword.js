'use strict';

angular.module('forgotPassword', [])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/forgotpassword', {
                templateUrl: 'js/forgotPassword/forgotPassword.html',
                controller: 'forgotPasswordController'
            })
            .when('/resetpassword/:uid/:token', {
                templateUrl: 'js/forgotPassword/resetPassword.html',
                controller: 'resetPasswordController'
            });
    });
