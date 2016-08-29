'use strict';

angular.module('registerMunicipality')
    .controller('registerMunicipalityController', function ($scope, formValidator) {
        $scope.municipalityData = {
            name: undefined,
            email: undefined,
            password: undefined
        }

        $scope.$watch('municipalityData.email', function() {
            try{
                $scope.isValidEmail=formValidator.isValidEmail($scope.municipalityData.email);
            }catch (e){}
        });



    });
