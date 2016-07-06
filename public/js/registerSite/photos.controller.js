'use strict';

angular.module('registerSite')
    .controller('registerPhotosController', function ($scope, $auth, $http, MapService, uiGmapIsReady, messageService,
                                                    API_CONFIG, categories,
                                                    $location, MunicipiosFactory, authenticationService, siteAndTownSaverService,
                                                      siteInformationService, $translate, geolocation, ngDialog, $cookies) {



        $scope.$on('$viewContentLoaded', function(){
            checkSelectedPhotos();
        });
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
                        savePhotosTemporally();
                        $location.path('/summary');
                    } else {
                        $scope.showMainPhotoRequired = true;
                    }

        };


        $scope.changeViewLocation=function(){
             $location.path('/location');
        }

        function savePhotosTemporally(){
            siteInformationService.mainPhoto=$scope.flowMainPhoto.flow.files;
            siteInformationService.facadePhotos=$scope.flowFacadePhotos.flow.files;
            siteInformationService.insidePhotos=$scope.flowInsidePhotos.flow.files;
            siteInformationService.productsPhotos=$scope.flowProductsPhotos.flow.files;
        }

        function checkSelectedPhotos(){
            if(siteInformationService.mainPhoto.length!=0){
                $scope.flowMainPhoto.flow.files = siteInformationService.mainPhoto;
            }

            if(siteInformationService.facadePhotos.length!=0){
                $scope.flowFacadePhotos.flow.files = siteInformationService.facadePhotos;
            }

            if(siteInformationService.insidePhotos.length!=0){
                $scope.flowInsidePhotos.flow.files = siteInformationService.insidePhotos;
            }

            if(siteInformationService.productsPhotos.length!=0){
                $scope.flowProductsPhotos.flow.files = siteInformationService.productsPhotos;
            }
        }
    });