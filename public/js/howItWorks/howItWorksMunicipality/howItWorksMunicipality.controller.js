'use strict';

angular.module('howItWorks')
    .controller('HowItWorksMunicipalityController', function ($scope, $location) {

        $scope.goToRegisterSite = function () {
            $location.path('/registermunicipality');
        }
    });