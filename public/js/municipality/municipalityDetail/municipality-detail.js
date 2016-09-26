'use strict';

angular.module('Municipality')
    .config(function ($routeProvider, uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            //key: 'AIzaSyB01Crhc-gyfYhAxa8IdSVcKuUC4lHai7E',
            v: '3.22',
            libraries: 'weather,geometry,visualization,places'
        });

        $routeProvider
            .when('/municipality-detail', {
                templateUrl: 'js/municipality/municipalityDetail/municipality-detail.html',
                controller: 'MunicipalityDetailController'
            });
    });

