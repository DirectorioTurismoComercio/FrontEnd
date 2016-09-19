'use strict';

angular.module('Municipality', ['uiGmapgoogle-maps'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/municipalities', {
                templateUrl: 'js/municipality/searchMunicipality/searchMunicipality.html',
                controller: 'searchMunicipalityController'
            })
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
            .when('/municipalityphotos', {
                templateUrl: 'js/municipality/registerMunicipalityInformation/municipalityPhotos/municipalityPhotos.html',
                controller: 'municipalityPhotosController',
                required_roles: 'authenticatedUser'
            })
            .when('/municipalityaccountinfo', {
                templateUrl: 'js/municipality/municipalityAccountInfo/municipalityAccountInfo.html',
                controller: 'municipalityAccountInfoController',
                required_roles: 'authenticatedUser'
            })
            .when('/municipalityroute', {
                templateUrl: 'js/municipality/municipalityRoute/municipalityRoute.html',
                controller: 'municipalityRouteController'
               // required_roles: 'authenticatedUser'
            });
    });