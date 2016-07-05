'use strict';

angular.module('registerSite')
    .controller('registerPhotosController', function ($scope, $auth, $http, MapService, uiGmapIsReady, messageService,
                                                    API_CONFIG, categories,
                                                    $location, MunicipiosFactory, authenticationService, siteAndTownSaverService, siteInformationService, $translate, geolocation, ngDialog, $cookies) {



        $scope.flowMainPhoto = {};
        $scope.flowFacadePhotos = {};
        $scope.flowInsidePhotos = {};
        $scope.flowProductsPhotos = {};
        $scope.showRequiredFieldMessage = false;
        $scope.showMainPhotoRequired = false;


        $scope.mainPhotoOnClick = function () {
            $scope.showMainPhotoRequired = false;
        }

        $scope.changeViewSummary = function () {
                    if ($scope.flowMainPhoto.flow.files.length != 0) {
                        buildSitePhotosFormData();
                        $location.path('/summary');
                    } else {
                        $scope.showMainPhotoRequired = true;
                    }
                
        };


        $scope.changeViewLocation=function(){
             $location.path('/location');
        }

        function buildSitePhotosFormData() {
            var fd = new FormData();

            appendPhotos($scope.flowMainPhoto.flow.files, 'fotos_PRINCIPAL', fd);
            appendPhotos($scope.flowFacadePhotos.flow.files, 'fotos_FACHADA', fd);
            appendPhotos($scope.flowInsidePhotos.flow.files, 'fotos_INTERIOR', fd);
            appendPhotos($scope.flowProductsPhotos.flow.files, 'fotos_PRODUCTOS', fd);
            siteInformationService.formData = fd;
        }

        function appendPhotos(arrayPhotos, model, fd) {
            var photosCounter = 0;
            angular.forEach(arrayPhotos, function (file) {
                fd.append(model + photosCounter, file.file);
                photosCounter++;
            });
        }
    });