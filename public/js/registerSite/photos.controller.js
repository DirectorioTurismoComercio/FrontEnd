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

        var archivos=undefined;

        var r = new Flow();


        $("#the-file-input").change(function() {
            // will log a FileList object, view gifs below
            console.log(this.files);
            archivos=this.files;
        });

        $scope.mainPhotoOnClick = function () {
            $scope.showMainPhotoRequired = false;
        }

        $scope.changeViewSummary = function () {


            console.log("al iniciar el floew",r);


            var blob = new Blob(['./images/registerIcons/foto-subir.png'], {type: "image/png"});
            blob.name = 'nombre';

            //$scope.flowMainPhoto.flow.addFile(archivos);

           //$scope.flowMainPhoto.flow.addFile(blob);

            console.log("el r",r);
            console.log("main", $scope.flowMainPhoto);

                   /* if ($scope.flowMainPhoto.flow.files.length != 0) {
                        buildSitePhotosFormData();
                        $location.path('/summary');
                    } else {
                        $scope.showMainPhotoRequired = true;
                    }*/
                
        };


        var imageUrl;
        var blob23;

        $http({
            method: 'GET',
            url: 'http://ecosistema.desarrollo.com/FrontEnd/public/images/RegistroIconMenu.png',
            responseType:"arraybuffer"
        })
            .success(function (d) {
                var arrayBufferView = new Uint8Array( d );
                blob23 = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
              //  var urlCreator = window.URL || window.webkitURL;
              //  imageUrl = urlCreator.createObjectURL( blob );
                //$scope.flowFacadePhotos.flow.addExistingFile(imageUrl);
            }).error(function (error) {
            console.log("hubo un error", error);
        });


        $scope.$on('$viewContentLoaded', function(){
            var urlImage = 'http://ecosistema.desarrollo.com/FrontEnd/public/images/RegistroIconMenu.png';
            $http({
                method: 'GET',
                url: urlImage,
                responseType:"arraybuffer"
            })
                .success(function (d) {
                    console.log("D",d)
                    var arrayBufferView = new Uint8Array( d );
                    blob23 = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
                    /*Flow.prototype.addExistingFile = function (file, event) {
                        console.log("THIS",this);
                        var f = new Flow.FlowFile(this, file);
                        this.files.push(f);
                    };*/

                    blob23.name = 'RegistroIconMenu.png';
                    blob23.image_url = urlImage;
                    blob23.lastModifiedDate = new Date();
                    console.log("uame", blob23);
                  //  $scope.flowMainPhoto.flow.addExistingFile(blob23);
                    var f = new Flow.FlowFile($scope.flowMainPhoto.flow, blob23);
                    $scope.flowMainPhoto.flow.files.push(f);
                }).error(function (error) {
                console.log("hubo un error", error);
            });


        });





        $scope.initExistingImages = function(listing_images, flowObj) {

            //var imagen=$scope.flowMainPhoto.flow.files[0];
            //flowObj.files.push(imagen);
            Flow.prototype.addExistingFile = function (file, event) {

                var f = new Flow.FlowFile(this, file);
                this.files.push(f);
            };



                var blob = new Blob(['a'], {type: "image/png"});
                blob23.name = 'RegistroIconMenu.png';
                blob23.image_url = 'http://ecosistema.desarrollo.com/FrontEnd/public/images/RegistroIconMenu.png';
                blob23.lastModifiedDate = new Date();
                console.log("uame", blob23);
                flowObj.addExistingFile(blob23);
            console.log("flowObj",flowObj);

            // Simulate a call to Dropbox or other service that can
// return an image as an ArrayBuffer.







            console.log("main photo", $scope.flowMainPhoto);

            console.log("fachada", $scope.flowFacadePhotos);

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