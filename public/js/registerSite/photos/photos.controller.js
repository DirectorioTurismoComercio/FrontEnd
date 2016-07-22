'use strict';

angular.module('registerSite')
    .controller('registerPhotosController', function ($scope, $auth, $http, MapService, uiGmapIsReady,
                                                      messageService, API_CONFIG, categories, $location,
                                                      MunicipiosFactory, authenticationService, siteAndTownSaverService,
                                                      siteInformationService, ImageService) {


        $scope.$on('$viewContentLoaded', function () {
            checkSelectedPhotos();
        });
        $scope.flowMainPhoto = {};
        $scope.flowFacadePhotos = {};
        $scope.flowInsidePhotos = {};
        $scope.flowProductsPhotos = {};
        $scope.showRequiredFieldMessage = false;
        $scope.showMainPhotoRequired = false;

        $scope.loadingMainPhoto = false;
        $scope.loadingFacadePhoto = false;
        $scope.loadingInsidePhoto = false;
        $scope.loadingProductsPhoto = false;


        var lastFacadeFileIndex;
        var lastInsideFileIndex;
        var lastProductsFileIndex;


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

        $scope.changeViewLocation = function () {
            $location.path('/location');
        }


        function savePhotosTemporally() {
            siteInformationService.mainPhoto = $scope.flowMainPhoto.flow.files;
            siteInformationService.facadePhotos = $scope.flowFacadePhotos.flow.files;
            siteInformationService.insidePhotos = $scope.flowInsidePhotos.flow.files;
            siteInformationService.productsPhotos = $scope.flowProductsPhotos.flow.files;
        }

        function checkSelectedPhotos() {

            if (siteInformationService.mainPhoto.length != 0) {
                $scope.flowMainPhoto.flow.files = siteInformationService.mainPhoto;
            }

            if (siteInformationService.facadePhotos.length != 0) {
                $scope.flowFacadePhotos.flow.files = siteInformationService.facadePhotos;
            }

            if (siteInformationService.insidePhotos.length != 0) {
                $scope.flowInsidePhotos.flow.files = siteInformationService.insidePhotos;
            }

            if (siteInformationService.productsPhotos.length != 0) {
                $scope.flowProductsPhotos.flow.files = siteInformationService.productsPhotos;
            }


            if (siteInformationService.URLphotos) {
                loadPhotosFromServer();
                siteInformationService.URLphotos = undefined;
            }


        }

        function loadPhotosFromServer() {
            var i;
            for (i = 0; i < siteInformationService.URLphotos.length; i++) {
                loadPhotoFromURL(siteInformationService.URLphotos[i].URLfoto, siteInformationService.URLphotos[i].tipo);
            }

        }


        $scope.imgLoadedCallback = function (flowObjectName, fileIndex) {
            switch (flowObjectName) {
                case 'mainPhoto':
                    processImage($scope.flowMainPhoto.flow, 0, flowObjectName);
                    $scope.loadingMainPhoto = false;
                    break;

                case 'facadePhotos':
                    previewPhoto($scope.flowFacadePhotos.flow, fileIndex, lastFacadeFileIndex, flowObjectName);
                    $scope.loadingFacadePhoto = false;
                    break;

                case 'insidePhotos':
                    previewPhoto($scope.flowInsidePhotos.flow, fileIndex, lastInsideFileIndex, flowObjectName);
                    $scope.loadingInsidePhoto = false;
                    break;

                case 'productsPhotos':
                    previewPhoto($scope.flowProductsPhotos.flow, fileIndex, lastProductsFileIndex, flowObjectName);
                    $scope.loadingProductsPhoto = false;
                    break;
            }
        };

        function previewPhoto(flowObject, fileIndex, lastPhotoFileIndex, flowObjectName) {
            if (fileIndex != lastPhotoFileIndex) {
                lastPhotoFileIndex = fileIndex;
                processImage(flowObject, fileIndex, flowObjectName);
            }
        };

        function updateFlowObject(flowObject, fileIndex, flowFile) {
            flowObject.files.splice(fileIndex, 1);
            flowObject.files.push(flowFile);
        }

        function processImage(flowObject, fileIndex, photoLoading) {
            var orientation;
            var flowFile = flowObject.files[fileIndex];

            EXIF.getData(flowFile.file, function () {
                if (flowFile.processing == undefined) {
                    flowFile.processing = true;
                    updateFlowObject(flowObject, fileIndex, flowFile);
                    orientation = this.exifdata.Orientation;
                    reduceImageWeigth(flowObject.files[fileIndex]).then(function (base64Image) {
                        ImageService.rotateImage(photoLoading, orientation, base64Image).then(function (base64RotatedImage) {
                            var blob = dataURLToBlob(base64RotatedImage, flowObject.files[fileIndex].uniqueIdentifier);
                            flowFile = new Flow.FlowFile(flowObject, blob);
                            flowFile.processing = true;
                            updateFlowObject(flowObject, fileIndex, flowFile);
                        });
                    });
                }
            });
        }


        function reduceImageWeigth(flowObjectFile) {
            console.log("reducing file");
            return ImageService.reduceImageSize(flowObjectFile.file).then(function (base64Image) {
                return base64Image;
                //return dataURLToBlob(image, flowObjectFile.uniqueIdentifier);
            });
        }

        function dataURLToBlob(dataURL, name) {
            var blob;
            var BASE64_MARKER = ';base64,';
            if (dataURL.indexOf(BASE64_MARKER) == -1) {
                var parts = dataURL.split(',');
                var contentType = parts[0].split(':')[1];
                var raw = decodeURIComponent(parts[1]);

                return new Blob([raw], {type: contentType});
            }

            var parts = dataURL.split(BASE64_MARKER);
            var contentType = parts[0].split(':')[1];
            var raw = window.atob(parts[1]);
            var rawLength = raw.length;

            var uInt8Array = new Uint8Array(rawLength);

            for (var i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }

            blob = new Blob([uInt8Array], {type: contentType});
            blob.name = name;
            blob.lastModifiedDate = new Date();

            return blob;
        }

        function loadPhotoFromURL(urlPhoto, tipo) {

            $http({
                method: 'GET',
                url: urlPhoto,
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
            }).error(function (error) {
                console.log("hubo un error al cargar la foto", error);
            });
        }

        function getFlow(photoType) {

            if (photoType == 'P') return $scope.flowMainPhoto;
            if (photoType == 'F') return $scope.flowFacadePhotos;
            if (photoType == 'I') return $scope.flowInsidePhotos;
            if (photoType == 'PR') return $scope.flowProductsPhotos;

            return $scope.flowMainPhoto;
        }

        function changeLoadingState(photoLoading, state) {
            switch (photoLoading) {
                case 'mainPhoto':
                    $scope.loadingMainPhoto = state;
                    break;
                case 'facadePhotos':
                    $scope.loadingFacadePhoto = state;
                    break;

                case 'insidePhotos':
                    $scope.loadingInsidePhoto = state;
                    break;

                case 'productsPhotos':
                    $scope.loadingProductsPhoto = state;
                    break;
            }
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
;
;