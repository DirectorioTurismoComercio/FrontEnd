'use strict';

angular.module('registerSite', ['ngTagsInput', 'uiGmapgoogle-maps'])
    .config(function ($routeProvider, uiGmapGoogleMapApiProvider) {
        $routeProvider
            .when('/registersite', {
                templateUrl: 'js/registersite/registersite.html',
                controller: 'registerSiteController'
            });

    });

