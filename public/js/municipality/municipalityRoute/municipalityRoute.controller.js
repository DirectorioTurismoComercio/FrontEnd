'use strict';

angular.module('Municipality')
    .controller('municipalityRouteController', function ($scope, uiGmapIsReady, MapService, $location) {
        $scope.map = {
            center: {
                latitude: 4.6363623, //parseFloat(municipalityInformationService.getMunicipalityName().latitud),
                longitude: -74.0854427//parseFloat(municipalityInformationService.getMunicipalityName().longitud)
            },
            control: {},
            zoom: 13
        };

        $scope.routeName = undefined;
        $scope.routeDescription = undefined;
        $scope.routeSites = [];


        uiGmapIsReady.promise().then(initMap);

        function initMap() {
            MapService.setGMap($scope.map.control.getGMap());
        }

        $scope.changeViewMunicipalityAccount = function () {
            $location.path('/municipalityaccountinfo');
        }

        $scope.cancelRegister = function () {
            $location.path('/municipalityaccountinfo');
        }

        $scope.addSite = function () {
            var newRouteSite = $scope.routeSites.length + 1;
            $scope.routeSites.push({'id': 'site' + newRouteSite});
        }

        $scope.removeSite = function (index) {
            $scope.routeSites.splice(index, 1);
        }
    });