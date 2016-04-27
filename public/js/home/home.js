'use strict';

angular.module('home', ['ngMaterial', 'geolocation'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'js/home/home.html',
                controller: 'HomeController'
            });
    });
