'use strict';

angular.module('registerSite', [])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/registersite', {
                templateUrl: 'js/registersite/registersite.html',
                controller: 'registerSiteController'
            });
    });

