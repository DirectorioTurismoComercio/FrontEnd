'use strict';

angular.module('registerSite', ['ngTagsInput', 'uiGmapgoogle-maps', 'flow', 'ngDialog'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/registersite', {
                templateUrl: 'js/registerSite/registersite.html',
                controller: 'registerSiteController'
            })
            .when('/businessinformation', {
                templateUrl: 'js/registerSite/businessinformation.html',
                controller: 'businessInformationController'
            })
            .when('/location', {
                templateUrl: 'js/registerSite/location.html',
                controller: 'locationController'
            })
            .when('/photos', {
                templateUrl: 'js/registerSite/photos.html',
                controller: 'registerPhotosController'
            })
            .when('/summary', {
                templateUrl: 'js/registerSite/summary.html',
                controller: 'summaryController'
            })
            ;

    });

