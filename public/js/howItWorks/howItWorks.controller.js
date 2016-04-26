'use strict';

angular.module('howItWorks')
    .controller('HowItWorksController', function ($scope, $location, siteAndTownSaverService) {

        $scope.goToMapSearchTab = function () {
            siteAndTownSaverService.setSearchedQuery("", "");
            $location.path('/map');
        };

        $scope.goToMapRouteTab = function () {
            siteAndTownSaverService.setSearchedRoute("", "");
            $location.path('/map');
        };

    });