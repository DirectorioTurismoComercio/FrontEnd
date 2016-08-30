'use strict';

angular.module('Municipality', [])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/registermunicipality', {
                templateUrl: 'js/municipality/registerMunicipalityAccount/registermunicipality.html',
                controller: 'registerMunicipalityAccountController'
            });

    });