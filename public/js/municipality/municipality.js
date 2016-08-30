'use strict';

angular.module('Municipality', [])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/registermunicipality', {
                templateUrl: 'js/municipality/registerMunicipalityAccount/registermunicipality.html',
                controller: 'registerMunicipalityAccountController'
            })
            .when('/loginmunicipality', {
                templateUrl: 'js/municipality/loginMunicipality/loginMunicipality.html',
                controller: 'loginMunicipalityController'
            });

    });