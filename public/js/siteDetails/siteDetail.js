'use strict';

angular.module('siteDetail', [])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/sitedetail', {
                templateUrl: 'js/siteDetails/siteDetail.html',
                controller: 'siteDetailController'
            });
    });