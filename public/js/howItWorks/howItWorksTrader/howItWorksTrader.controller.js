'use strict';

angular.module('howItWorks')
    .controller('HowItWorksTraderController', function ($scope, $location) {

        $scope.goToRegisterSite = function () {
            $location.path('/registertrader');
        }
    });