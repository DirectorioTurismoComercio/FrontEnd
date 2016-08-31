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

        function loadPhotosFromServer() {
            var i;
            $scope.loadingPhotos = true;
            numPhotos = municipalityInformationService.getMunicipalityURLPhotos().length;
            for (i = 0; i < numPhotos; i++) {
                loadPhotoFromURL(municipalityInformationService.getMunicipalityURLPhotos()[i].URLfoto, municipalityInformationService.getMunicipalityURLPhotos()[i].tipo);
            }
        }

        function loadPhotoFromURL(urlPhoto, tipo) {

            var arg = "?randnum=1"

            $http({
                method: 'GET',
                url: urlPhoto + arg,
                responseType: "arraybuffer"
            }).success(function (data) {
                var arrayBufferView = new Uint8Array(data);
                var blob = new Blob([arrayBufferView], {type: "image/jpeg"});
                blob.name = 'RegistroIconMenu.jpg';
                blob.lastModifiedDate = new Date();
                var file;
                var flowPhotos = getFlow(tipo);
                file = new Flow.FlowFile(flowPhotos.flow, blob);
                flowPhotos.flow.files.push(file);
                loadedPhotos++;
                if (loadedPhotos == numPhotos) {
                    $scope.loadingPhotos = false;
                }
            }).error(function (error) {
                console.log("hubo un error al cargar la foto", error);
            });
        }

        function getFlow(photoType) {

            if (photoType == 'P') return $scope.flowMunicipalityMainPhoto;
            if (photoType == 'F') return $scope.flowMunicipalityFacedePhotos;
            if (photoType == 'I') return $scope.flowCoatArmsPhoto;

            return $scope.flowMainPhoto;
        }

        function savePhotosTemporally() {
            municipalityInformationService.setMunicipalityMainPhoto($scope.flowMunicipalityMainPhoto.flow.files);
            municipalityInformationService.setMunicipalityCoatArmsPhoto($scope.flowCoatArmsPhoto.flow.files);
            municipalityInformationService.setMunicipalityFacadePhotos($scope.flowMunicipalityFacedePhotos.flow.files);
        }

        $scope.correctOrientation = function (orientation) {
            var style = '';

            switch (orientation) {
                case 3:
                    style = 'rotate180';
                    break;
                case 4:
                    style = 'rotate180';
                    break;
                case 5:
                    style = 'rotate90';
                    break;
                case 6:
                    style = 'rotate90';
                    break;
                case 7:
                    style = 'rotate270';
                    break;
                case 8:
                    style = 'rotate270';
                    break;
            }

            return style;
        };


    });