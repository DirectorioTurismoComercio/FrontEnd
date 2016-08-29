'use strict';

angular.module('registerMunicipality', [])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/registermunicipality', {
                templateUrl: 'js/registerMunicipality/registermunicipality.html',
                controller: 'registerMunicipalityController'
            });

    });