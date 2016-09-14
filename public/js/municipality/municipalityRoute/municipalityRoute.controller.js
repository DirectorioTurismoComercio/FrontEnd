'use strict';

angular.module('Municipality')
    .controller('municipalityRouteController', function ($scope, uiGmapIsReady, MapService, $location,authenticationService, municipalityInformationService) {
        $scope.map = {
            center: {
                latitude:  parseFloat(municipalityInformationService.getMunicipalityName().latitud),
                longitude: parseFloat(municipalityInformationService.getMunicipalityName().longitud)
            },
            control: {},
            zoom: 13
        };

        $scope.routeName=undefined;
        $scope.routeDescription=undefined;


        uiGmapIsReady.promise().then(initMap);

        function initMap() {
            MapService.setGMap($scope.map.control.getGMap());
        }

        $scope.changeViewMunicipalityAccount=function(){
            $location.path('/municipalityaccountinfo');
        }

        $scope.cancelRegister=function(){
            $location.path('/municipalityaccountinfo');
        }
});