'use strict';

angular.module('registerSite', ['ngTagsInput', 'uiGmapgoogle-maps'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/registersite', {
                templateUrl: 'js/registerSite/registersite.html',
                controller: 'registerSiteController'
            })
            .when('/businessinformation', {
                templateUrl: 'js/registerSite/businessinformation.html',
                controller: 'registerSiteController'
            })
            .when('/location', {
                templateUrl: 'js/registerSite/location.html',
                controller: 'registerSiteController'
            })
            .when('/photos', {
                templateUrl: 'js/registerSite/photos.html',
                controller: 'registerSiteController'
            })
            .when('/summary', {
                templateUrl: 'js/registerSite/summary.html',
                controller: 'registerSiteController'
            })
            ;

    });

