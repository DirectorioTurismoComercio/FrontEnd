'use strict';

angular.module('Municipality')
    .controller('municipalityRouteController', function ($scope, uiGmapIsReady, MapService, $location) {
        $scope.map = {
            center: {
                latitude: 4.6363623,
                longitude: -74.0854427
            },
            control: {},
            zoom: 9
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
});