'use strict';

angular.module('registerSite', ['ngTagsInput', 'uiGmapgoogle-maps', 'extendi.business-hours'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/registersite', {
                templateUrl: 'js/registerSite/registersite.html',
                controller: 'registerSiteController'
            });

    });

