'use strict';

angular.module('howItWorks')
    .controller('HowItWorksController', function ($scope, $location, siteAndTownSaverService) {

        $scope.goToMapSearchTab = function () {
            siteAndTownSaverService.setSearchedQuery("", "");
            resetAndGoToMap();
        };

        $scope.goToMapRouteTab = function () {
            siteAndTownSaverService.setSearchedRoute("", "");
            resetAndGoToMap();
        };

        function resetAndGoToMap(){
            siteAndTownSaverService.resetSearchAndRoute();
            $location.path('/map');
        }
    });