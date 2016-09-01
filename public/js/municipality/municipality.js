'use strict';

angular.module('Municipality', ['uiGmapgoogle-maps'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/registermunicipality', {
                templateUrl: 'js/municipality/registerMunicipalityAccount/registermunicipality.html',
                controller: 'registerMunicipalityAccountController'
            })
            .when('/loginmunicipality', {
                templateUrl: 'js/municipality/loginMunicipality/loginMunicipality.html',
                controller: 'loginMunicipalityController'
            })
            .when('/municipalityinfo', {
                templateUrl: 'js/municipality/registerMunicipalityInformation/municipalityInfo/municipalityinfo.html',
                controller: 'municipalityInfoController',
                required_roles: 'authenticatedUser'
            })
            .when('/municipalitylocation', {
                templateUrl: 'js/municipality/registerMunicipalityInformation/municipalityLocation/municipalityLocation.html',
                controller: 'municipalityLocationController',
                required_roles: 'authenticatedUser'
            })
            .when('/municiplaityphotos', {
                templateUrl: 'js/municipality/registerMunicipalityInformation/municipalityPhotos/municipalityPhotos.html',
                controller: 'municipalityPhotosController',
                required_roles: 'authenticatedUser'
            });
    });