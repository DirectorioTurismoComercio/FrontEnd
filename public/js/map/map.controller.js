'use strict';

angular.module('map')
    .controller('MapController', function ($scope, uiGmapGoogleMapApi) {
        $scope.map = {
            center: {
                latitude: 4.5809775,
                longitude: -74.1340484
            },
            zoom: 9
        };

        uiGmapGoogleMapApi.then(function (maps) {

        });
    });