'use strict';

angular.module('Municipality')
    .controller('municipalityInfoController', function ($scope, $location, municipalityInformationService) {

        $scope.municipalitySelected=municipalityInformationService.getMunicipalitySelected();
        $scope.municipalityPhoneNumber=municipalityInformationService.getsetMunicipalityPhoneNumber();
        $scope.municipalityWhatsapp=municipalityInformationService.getMunicipalityWhatsapp();
        $scope.municipalityWeb=municipalityInformationService.getMunicipalityWeb();
        $scope.municipalityDescription=municipalityInformationService.getMunicipalityDescription();
        $scope.municipalityOpeningHours=municipalityInformationService.getMunicipalityOpeningHours();


        $scope.changeViewHome = function () {
            goHome();
        };

        $scope.$on('$routeChangeStart', function (scope, next, current) {
            if(next.$$route.controller=='registerMunicipalityAccountController') {
                goHome();
            }
        });

        function goHome(){
            $location.path('/home');
        }

    });