'use strict';

angular.module('map')
    .factory('sitesNearRoute', function ($resource, $http, API_CONFIG) {

        function getSitesNearRoute(points){
            return  $http.post(API_CONFIG.url + API_CONFIG.sitios, {'points': points}, {});
        }

        return {
            getSitesNearRoute:getSitesNearRoute
        }
    });