'use strict';

angular.module('home', [])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'js/home/home.html',
                controller: 'HomeController'
            });
    });
