'use strict';

angular.module('map', [])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/map', {
                templateUrl: 'js/map/map.html',
                controller: 'MapController'
            });
    });
