'use strict';

angular.module('accountInfo', [])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/accountinfo', {
                templateUrl: 'js/accountInfo/accountInfo.html',
                controller: 'AccountInfoController',
                required_roles: 'authenticatedUser'
            });
    });
