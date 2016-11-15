'use strict';

angular.module('map')
    .factory('sitesNearRoute', function ($resource, $http, API_CONFIG) {

        function getSitesNearRoute(points){
            return  $http.post(API_CONFIG.url + API_CONFIG.sitios, {'points': points, 'page':1}, {});
        }

        return {
            getSitesNearRoute:getSitesNearRoute
        }
    });