'use strict';

angular.module('registerSite')
    .controller('registerPhotosController', function ($scope, $auth, $http, MapService, uiGmapIsReady,
                                                      messageService, API_CONFIG, categories, $location, resizeService,
                                                      MunicipiosFactory, authenticationService, siteAndTownSaverService,
                                                      siteInformationService) {


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
        $scope.loadingPhotos = false;
        $scope.loader=false;
        $scope.user=siteInformationService.user;



        var numPhotos;
        var loadedPhotos = 0;



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
                    
        $scope.imgLoadedCallback = function (flowFile) {
            var orientation = 0;
            if(flowFile.file.size>500000){
                console.log(flowFile)
                processImage(flowFile);
            } 
                
            EXIF.getData(flowFile.file, function () {
                console.log(flowFile)
                orientation = this.exifdata.Orientation;
                flowFile.orientation = orientation;
                
                $scope.$apply();
            });
        };
        
        
        function processImage(flowFile){
        
        var src = URL.createObjectURL(flowFile.file);
        resizeService
    .resizeImage(src, {
        width: 1200,
        height: 800,
        step: 3,
        outputFormat: 'image/jpeg',
        sizeScale: 'ko'
        
    })
    .then(function(image){    

    var blob = dataURItoBlob(image);
                            blob.name = 'blob';
                            blob.lastModifiedDate = new Date();
                            
                            for(var i=0;i<flowFile.flowObj.files.length;i++){
         
                                
                                if(flowFile.flowObj.files[i].file===flowFile.file){
                                flowFile.flowObj.files[i]= new Flow.FlowFile(flowFile.flowObj, new File([blob], flowFile.file.name, {type: "image/jpeg", lastModified: Date.now()}));
                                flowFile.flowObj.files[i].file.exifdata = flowFile.file.exifdata;
                                flowFile.flowObj.files[i].file.iptcdata = flowFile.file.iptcdata;
                               
                                }
                            }
                           
                         
    })
    .catch(
        function(error){
            console.log("error",error);
        }
        );

        }
function dataURItoBlob(dataURI, callback) {
// convert base64 to raw binary data held in a string
// doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
var byteString = atob(dataURI.split(',')[1]);

// separate out the mime component
var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

// write the bytes of the string to an ArrayBuffer
var ab = new ArrayBuffer(byteString.length);
var ia = new Uint8Array(ab);
for (var i = 0; i < byteString.length; i++) {
ia[i] = byteString.charCodeAt(i);
}

// write the ArrayBuffer to a blob, and you're done
var bb = new Blob([ab], {type: mimeString});
return bb;
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
                savePhotosTemporally();
                siteInformationService.URLphotos = undefined;
            }


        }

        function loadPhotosFromServer() {
            var i;
            $scope.loader = true;
            numPhotos = siteInformationService.URLphotos.length;
            for (i = 0; i < numPhotos; i++) {
                loadPhotoFromURL(siteInformationService.URLphotos[i].URLfoto, siteInformationService.URLphotos[i].tipo);
            }

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

            if (photoType == 'P') return $scope.flowMainPhoto;
            if (photoType == 'F') return $scope.flowFacadePhotos;
            if (photoType == 'I') return $scope.flowInsidePhotos;
            if (photoType == 'PR') return $scope.flowProductsPhotos;

            return $scope.flowMainPhoto;
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