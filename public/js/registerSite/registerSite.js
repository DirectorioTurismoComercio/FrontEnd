'use strict';

angular.module('registerSite', ['ngTagsInput'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/registersite', {
                templateUrl: 'js/registersite/registersite.html',
                controller: 'registerSiteController'
            });
    });

