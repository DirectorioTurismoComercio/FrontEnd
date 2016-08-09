'use strict';

angular.module('registerSite', ['ngTagsInput', 'uiGmapgoogle-maps', 'flow', 'ngDialog'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/businessinformation', {
                templateUrl: 'js/registerSite/businessInformation/businessinformation.html',
                controller: 'businessInformationController',
                //required_roles: 'authenticatedUser'
            })
            .when('/category', {
                templateUrl: 'js/registerSite/category/category.html',
                controller: 'categoryController',
                //required_roles: 'authenticatedUser'

            })
            .when('/location', {
                templateUrl: 'js/registerSite/location/location.html',
                controller: 'locationController',
                //required_roles: 'authenticatedUser'

            })
            .when('/photos', {
                templateUrl: 'js/registerSite/photos/photos.html',
                controller: 'registerPhotosController',
                //required_roles: 'authenticatedUser'

            })
            .when('/summary', {
                templateUrl: 'js/registerSite/summary/summary.html',
                controller: 'summaryController',
                //required_roles: 'authenticatedUser'

            })
            ;

    });