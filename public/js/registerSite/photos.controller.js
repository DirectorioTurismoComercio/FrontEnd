'use strict';

angular.module('registerSite')
    .controller('registerPhotosController', function ($scope, $auth, $http, MapService, uiGmapIsReady, messageService,
                                                      API_CONFIG, categories,
                                                      $location, MunicipiosFactory, authenticationService, siteAndTownSaverService,
                                                      siteInformationService, $translate, geolocation, ngDialog) {


        $scope.$on('$viewContentLoaded', function () {
            checkSelectedPhotos();
        });
        $scope.flowMainPhoto = {};
        $scope.flowFacadePhotos = {};
        $scope.flowInsidePhotos = {};
        $scope.flowProductsPhotos = {};
        $scope.showRequiredFieldMessage = false;
        $scope.showMainPhotoRequired = false;

        $scope.loadingMainPhoto=false;
        $scope.loadingFacadePhoto=false;
        $scope.loadingInsidePhoto=false;
        $scope.loadingProductsPhoto=false;


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
        }


        $scope.imgLoadedCallback=function(flowObjectName,fileIndex){
            console.log("se llama el onload");
           switch (flowObjectName) {
               case 'mainPhoto':
                   processImage($scope.flowMainPhoto.flow,0, flowObjectName);
                   $scope.loadingMainPhoto=false;
                   break;

               case 'facadePhotos':
                   previewPhoto($scope.flowFacadePhotos.flow,fileIndex,lastFacadeFileIndex, flowObjectName);
                   $scope.loadingFacadePhoto=false;
               break;

               case 'insidePhotos':
                   previewPhoto($scope.flowInsidePhotos.flow,fileIndex,lastInsideFileIndex, flowObjectName);
                   $scope.loadingInsidePhoto=false;
                   break;

               case 'productsPhotos':
                   previewPhoto($scope.flowProductsPhotos.flow,fileIndex,lastProductsFileIndex, flowObjectName);
                   $scope.loadingProductsPhoto=false;
                   break;
           }

        }

        function previewPhoto(flowObject,fileIndex,lastPhotoFileIndex,flowObjectName){
            if(fileIndex!=lastPhotoFileIndex){
                lastPhotoFileIndex=fileIndex;
                processImage(flowObject,fileIndex,flowObjectName);
            }
        }

        function processImage(flowObject,fileIndex, photoLoading){
            try{
                EXIF.getData(flowObject.files[fileIndex].file,function() {
                    var orientation = EXIF.getTag(this,"Orientation");
                    if (orientation) {
                        changeLoadingState(photoLoading, true);
                        var can = document.createElement("canvas");
                        var ctx = can.getContext('2d');
                        var thisImage = new Image;
                        thisImage.onload = function() {
                            can.width  = thisImage.width;
                            can.height = thisImage.height;
                            ctx.save();
                            var width  = can.width;  var styleWidth  = can.style.width;
                            var height = can.height; var styleHeight = can.style.height;

                            if (orientation > 4) {
                                can.width  = height; can.style.width  = styleHeight;
                                can.height = width;  can.style.height = styleWidth;
                            }
                            switch (orientation) {
                                case 2: ctx.translate(width, 0);     ctx.scale(-1,1); break;
                                case 3: ctx.translate(width,height); ctx.rotate(Math.PI); break;
                                case 4: ctx.translate(0,height);     ctx.scale(1,-1); break;
                                case 5: ctx.rotate(0.5 * Math.PI);   ctx.scale(1,-1); break;
                                case 6: ctx.rotate(0.5 * Math.PI);   ctx.translate(0,-height); break;
                                case 7: ctx.rotate(0.5 * Math.PI);   ctx.translate(width,-height); ctx.scale(-1,1); break;
                                case 8: ctx.rotate(-0.5 * Math.PI);  ctx.translate(-width,0); break;
                            }

                            ctx.drawImage(thisImage,0,0);
                            ctx.restore();
                            var dataURL = can.toDataURL();
                            var blob=dataURLToBlob(dataURL);
                            blob.name = flowObject.files[fileIndex].uniqueIdentifier;
                            blob.lastModifiedDate = new Date();
                            var f = new Flow.FlowFile(flowObject, blob);
                            flowObject.files.splice(fileIndex,1);
                            flowObject.files.push(f);
                            $scope.$apply();
                        }
                        thisImage.src = URL.createObjectURL(flowObject.files[fileIndex].file);
                    }else{
                        changeLoadingState(photoLoading, false);
                    }
                });
            }catch (error){}

        }

        function changeLoadingState(photoLoading, state){
            switch (photoLoading){
                case 'mainPhoto':
                    $scope.loadingMainPhoto=state;
                    break;
                case 'facadePhotos':
                    $scope.loadingFacadePhoto=state;
                    break;

                case 'insidePhotos':
                    $scope.loadingInsidePhoto=state;
                    break;

                case 'productsPhotos':
                    $scope.loadingProductsPhoto=state;
                    break;
            }
        }
        
        function dataURLToBlob(dataURL) {
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

            return new Blob([uInt8Array], {type: contentType});
        }

    }).directive('imageOnload', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                scope.$apply(attrs.imageOnload);
            });
        }
    };
});;
;