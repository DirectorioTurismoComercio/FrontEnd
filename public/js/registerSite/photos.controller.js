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

        $scope.isrotated=false;

        $scope.doItOnce=false;

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


        function load(){

            //var fr = new FileReader();
            console.log("antes del proces");
            //  fr.onload = process;
            console.log("despues del proces");
            //fr.readAsArrayBuffer($scope.flowMainPhoto.flow.files[0].file);
            window.open(URL.createObjectURL($scope.flowMainPhoto.flow.files[0].file), "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400");


            console.log( $scope.flowMainPhoto.flow);

        }
        function process(){
            console.log("entro a process");
            var dv = new DataView(this.result);
            var offset = 0, recess = 0;
            var pieces = [];
            var i = 0;
            if (dv.getUint16(offset) == 0xffd8){
                offset += 2;
                var app1 = dv.getUint16(offset);
                offset += 2;
                while (offset < dv.byteLength){
                    if (app1 == 0xffe1){

                        pieces[i] = {recess:recess,offset:offset-2};
                        recess = offset + dv.getUint16(offset);
                        i++;
                    }
                    else if (app1 == 0xffda){
                        break;
                    }
                    offset += dv.getUint16(offset);
                    var app1 = dv.getUint16(offset);
                    offset += 2;
                }
                if (pieces.length > 0){
                    var newPieces = [];
                    pieces.forEach(function(v){
                        newPieces.push(this.result.slice(v.recess, v.offset));
                    }, this);
                    newPieces.push(this.result.slice(recess));
                    var br = new Blob(newPieces, {type: 'image/jpeg'});


                    br.name = 'RegistroIconMenu.jpg';
              //      br.image_url = 'urlImage';
                    br.lastModifiedDate = new Date();
                    console.log("br",br);
                    //window.open(URL.createObjectURL(br), "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400");

                    var f = new Flow.FlowFile($scope.flowFacadePhotos.flow, br);
                    $scope.flowFacadePhotos.flow.files.push(f);
                    console.log("facadephotos",$scope.flowFacadePhotos.flow);
                }
            }

            $scope.doItOnce=true;


        }



        $scope.someHandlerMethod=function(x,y,z){
            console.log("termino de agregar", $scope.flowMainPhoto.flow);

            /*getOrientation($scope.flowMainPhoto.flow.files[0].file, function(orientation) {
                alert('orientation: ' + orientation);
            });*/
        }


        $scope.onImgLoad = function (event) {
            $scope.doItOnce==false;


            var fr = new FileReader();
            console.log("antes del proces");
             fr.onload = process;
            console.log("despues del proces");
            fr.readAsArrayBuffer($scope.flowMainPhoto.flow.files[0].file);

                /*
                if(orientation==6){
                    $scope.isrotated=true;
                    $scope.$apply();
                }else{
                    $scope.isrotated=false;
                    $scope.$apply();
                }*/


            /*if($scope.doItOnce==false){
                load();
            }*/


        }

        function getOrientation(file, callback) {
            var reader = new FileReader();
            reader.onload = function(e) {
                console.log("buffer en el constructor",e.target.result.byteLength);
                var view = new DataView(e.target.result);
                if (view.getUint16(0, false) != 0xFFD8) return callback(-2);
                var length = view.byteLength, offset = 2;
                while (offset < length) {
                    var marker = view.getUint16(offset, false);
                    offset += 2;
                    if (marker == 0xFFE1) {
                        if (view.getUint32(offset += 2, false) != 0x45786966) return callback(-1);
                        var little = view.getUint16(offset += 6, false) == 0x4949;
                        offset += view.getUint32(offset + 4, little);
                        var tags = view.getUint16(offset, little);
                        offset += 2;
                        for (var i = 0; i < tags; i++)
                            if (view.getUint16(offset + (i * 12), little) == 0x0112){
                                view.setUint16(offset + (i * 12) + 8,5, little);
                                console.log("posicion", offset + (i * 12) + 8);
                                console.log("little", little);
                                console.log("la modificacion", view.getUint16(offset + (i * 12) + 8, little));
                                console.log("el valor del view antes", view.buffer.byteLength);
                                return callback(view);//callback(view.getUint16(offset + (i * 12) + 8, little));
                                 }
                    }
                    else if ((marker & 0xFF00) != 0xFF00) break;
                    else offset += view.getUint16(offset, false);
                }
                return callback(-1);
            };
            reader.readAsArrayBuffer(file);
        }



        $scope.changeViewLocation=function(){
            //$location.path('/location');
        }




    }) .directive('sbLoad', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            var fn = $parse(attrs.sbLoad);
            elem.on('load', function (event) {
                scope.$apply(function() {
                    fn(scope, { $event: event });
                });
            });
        }
    };
}]);;