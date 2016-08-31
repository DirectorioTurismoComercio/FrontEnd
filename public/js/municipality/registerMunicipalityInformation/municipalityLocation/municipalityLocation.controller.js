'use strict';

angular.module('Municipality')
    .controller('municipalityLocationController', function ($scope, $location, municipalityInformationService) {

        $scope.municipalitySelected = municipalityInformationService.getMunicipalitySelected();
        $scope.municipalityAddress = municipalityInformationService.getMunicipalityAddress();
        $scope.municipalityLocation = municipalityInformationService.getMunicipalityLocation();

        $scope.showRequiredFieldMessage = false;

        $scope.goMunicipalityInfo=function(){
            $location.path('/municipalityinfo');
        }



    });