'use strict';

angular.module('Municipality')
    .controller('municipalityPhotosController', function ($scope, $location, municipalityInformationService, messageService, API_CONFIG, $http) {

        $scope.$on('$viewContentLoaded', function () {
            checkSelectedPhotos();
        });

        $scope.flowMunicipalityMainPhoto = {};
        $scope.flowCoatArmsPhoto = {};
        $scope.flowMunicipalityFacedePhotos = {};

        $scope.showRequiredFieldMessage = false;
        $scope.showMunicipalityMainPhotoRequired = false;

        $scope.loadingPhotos = false;
        $scope.loadingMunicipalityMainPhoto = false;
        $scope.loadingCoatArmsPhoto = false
        $scope.loadingMunicipalityFacedePhotos = false;

        var numPhotos;
        var loadedPhotos = 0;

        $scope.mainPhotoOnClick = function () {
            $scope.showMunicipalityMainPhotoRequired = false;
        }

        $scope.goMunicipalityLocation = function () {
            $location.path('municipalitylocation');
        }

        $scope.changeViewSummary = function () {
            if ($scope.flowMunicipalityMainPhoto.flow.files.length != 0) {
                //Mensaje de confirmacion
            } else {
                $scope.showMunicipalityMainPhotoRequired = true;
            }
        };



        function checkSelectedPhotos() {

            if (municipalityInformationService.getMunicipalityMainPhoto().length != 0) {
                $scope.flowMunicipalityMainPhoto.flow.files = municipalityInformationService.getMunicipalityMainPhoto();

            }

            if (municipalityInformationService.getMunicipalityCoatArmsPhoto().length != 0) {
                $scope.flowCoatArmsPhoto.flow.files = municipalityInformationService.getMunicipalityCoatArmsPhoto();
            }

            if (municipalityInformationService.getMunicipalityFacadePhotos().length != 0) {
                $scope.flowMunicipalityFacedePhotos.flow.files = municipalityInformationService.getMunicipalityFacadePhotos();
            }


            if (municipalityInformationService.getMunicipalityURLPhotos()) {
                loadPhotosFromServer();
                savePhotosTemporally();
                municipalityInformationService.setMunicipalityURLPhotos(undefined);
            }


        }


    });