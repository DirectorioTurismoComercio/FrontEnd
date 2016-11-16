'use strict';

angular.module('Municipality')
    .controller('municipalityPhotosController', function ($scope, $location, municipalityInformationService, messageService, API_CONFIG, $http, ngDialog, $cookies) {

        $scope.$on('$viewContentLoaded', function () {
            checkSelectedPhotos();
        });

        $scope.municipalityId = municipalityInformationService.getMunicipalityId();

        $scope.flowMunicipalityMainPhoto = {};
        $scope.flowCoatArmsPhoto = {};
        $scope.flowMunicipalityFacedePhotos = {};

        $scope.showRequiredFieldMessage = false;
        $scope.showMunicipalityMainPhotoRequired = false;

        $scope.loadingPhotos = false;
        $scope.loadingMunicipalityMainPhoto = false;
        $scope.loadingCoatArmsPhoto = false
        $scope.loadingMunicipalityFacedePhotos = false;
        $scope.loader=false;
        $scope.photosLimitNumber=API_CONFIG.photosLimitNumber;


        var numPhotos;
        var loadedPhotos = 0;

        $scope.mainPhotoOnClick = function () {
            $scope.showMunicipalityMainPhotoRequired = false;
        }

        $scope.goMunicipalityLocation = function () {
            $location.path('municipalitylocation');
        }

        $scope.doneMunicipalityRegistration = function () {
            if ($scope.flowMunicipalityMainPhoto.flow.files.length != 0 && !$scope.loadingPhotos){
                savePhotosTemporally();
                $http.defaults.headers.post['X-CSRFToken'] = $cookies['csrftoken'];
                municipalityInformationService.sendMunicipalityDataToServer(openConfirmationmessage, errorSaving);
            } else {
                $scope.showMunicipalityMainPhotoRequired = true;
            }
        };

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

        $scope.imgLoadedCallback = function (flowFile) {
            var orientation = 0;

            EXIF.getData(flowFile.file, function () {
                orientation = this.exifdata.Orientation;
                flowFile.orientation = orientation;
                console.log("Image Orientation: ", orientation);
                $scope.$apply();
            });
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
            $scope.loader = true;
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
                    $scope.loader = false;
                }
            }).error(function (error) {
                console.log("hubo un error al cargar la foto", error);
            });
        }

        function getFlow(photoType) {

            if (photoType == 'P') return $scope.flowMunicipalityMainPhoto;
            if (photoType == 'F') return $scope.flowMunicipalityFacedePhotos;
            if (photoType == 'I') return $scope.flowCoatArmsPhoto;

            return $scope.flowMunicipalityMainPhoto;
        }

        function savePhotosTemporally() {
            municipalityInformationService.setMunicipalityMainPhoto($scope.flowMunicipalityMainPhoto.flow.files);
            municipalityInformationService.setMunicipalityCoatArmsPhoto($scope.flowCoatArmsPhoto.flow.files);
            municipalityInformationService.setMunicipalityFacadePhotos($scope.flowMunicipalityFacedePhotos.flow.files);
        }

        $scope.doneRegistration = function () {
            $scope.loadingPhotos=false;
            ngDialog.close();
            municipalityInformationService.resetData();
            $location.path('municipalityaccountinfo');
        }

        function openConfirmationmessage(){
            ngDialog.open({
                template: 'js/municipality/registerMunicipalityInformation/completeMunicipalityRegistration.html',
                width: 'auto',
                showClose: false,
                scope: $scope,
                closeByEscape: false,
                closeByDocument: false
            });
        }

        function errorSaving(e){
            $scope.loadingPhotos=false;
            console.log("hubo un error", e);
        }

    }).directive('imageOnload', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('load', function () {
                scope.$apply(attrs.imageOnload);
            });
        }
    };
});