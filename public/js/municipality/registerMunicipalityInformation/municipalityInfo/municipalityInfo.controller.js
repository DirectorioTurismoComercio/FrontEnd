'use strict';

angular.module('Municipality')
    .controller('municipalityInfoController', function ($scope, $location, municipalityInformationService, MunicipiosFactory) {

        $scope.municipalitySelected=municipalityInformationService.getMunicipalitySelected();
        $scope.municipalityPhoneNumber=municipalityInformationService.getsetMunicipalityPhoneNumber();
        $scope.municipalityWhatsapp=municipalityInformationService.getMunicipalityWhatsapp();
        $scope.municipalityWeb=municipalityInformationService.getMunicipalityWeb();
        $scope.municipalityDescription=municipalityInformationService.getMunicipalityDescription();
        $scope.municipalityOpeningHours=municipalityInformationService.getMunicipalityOpeningHours();

        $scope.showRequiredFieldMessage = false;


        MunicipiosFactory.getTowns().then(function (response) {
            $scope.municipalities = response;
        }).catch(function (error) {
            console.log("Ocurrio un error", error);
        });

        $scope.changeViewLocation = function () {
            if ($scope.registerMunicipalityInfoForm.$valid) {
                saveDataAndChangeView('/municipalitylocation');
            } else {
                $scope.showRequiredFieldMessage = true;
            }
        };

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

        function saveDataAndChangeView(view) {
            saveMunicipalityInformation();
            $location.path(view);
        }


        function saveMunicipalityInformation() {
            municipalityInformationService.setMunicipalitySelected($scope.municipalitySelected);
            municipalityInformationService.setMunicipalityPhoneNumber($scope.municipalityPhoneNumber);
            municipalityInformationService.setMunicipalityWhatsapp($scope.municipalityWhatsapp);
            municipalityInformationService.setMunicipalityWeb($scope.municipalityWeb);
            municipalityInformationService.setMunicipalityDescription($scope.municipalityDescription);
            municipalityInformationService.setMunicipalityOpeningHours($scope.municipalityOpeningHours);
        }

    });