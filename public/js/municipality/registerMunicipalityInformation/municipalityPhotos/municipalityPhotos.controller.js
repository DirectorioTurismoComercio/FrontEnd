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

        $scope.loadingMunicipalityMainPhoto = false;
        $scope.loadingCoatArmsPhoto = false
        $scope.loadingMunicipalityFacedePhotos = false;
        $scope.loadingPhotos = false;

        var numPhotos;
        var loadedPhotos = 0;

    });