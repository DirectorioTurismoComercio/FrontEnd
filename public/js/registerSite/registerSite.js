'use strict';

angular.module('registerSite', ['ngTagsInput', 'uiGmapgoogle-maps', 'flow', 'ngDialog'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/businessinformation', {
                templateUrl: 'js/registerSite/businessInformation/businessinformation.html',
                controller: 'businessInformationController'
            })
            .when('/category', {
                templateUrl: 'js/registerSite/category/category.html',
                controller: 'categoryController'
            })
            .when('/location', {
                templateUrl: 'js/registerSite/location/location.html',
                controller: 'locationController'
            })
            .when('/photos', {
                templateUrl: 'js/registerSite/photos/photos.html',
                controller: 'registerPhotosController'
            })
            .when('/summary', {
                templateUrl: 'js/registerSite/summary/summary.html',
                controller: 'summaryController'
            })
            ;

    });