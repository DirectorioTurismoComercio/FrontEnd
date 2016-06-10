'use strict';

angular.module('registerSite')
    .controller('registerSiteController', function ($scope, $http, MapService, uiGmapIsReady, messageService, CUNDINAMARCA_COORDS,
                                                    BOGOTA_COORDS, API_CONFIG, categories,
                                                    $location,$q, authenticationService, siteAndTownSaverService, siteInformationService, $translate, geolocation, ngDialog) {


        $scope.sitePhoneNumber = siteInformationService.sitePhoneNumber;
        $scope.whatsapp = siteInformationService.whatsapp;
        $scope.web = siteInformationService.web;
        $scope.openingHours = siteInformationService.openingHours;
        $scope.businessName = siteInformationService.businessName;
        $scope.businessLocation = siteInformationService.businessLocation;
        $scope.businessDescription = siteInformationService.businessDescription;
        $scope.tags = siteInformationService.tags;
        $scope.businessEmail = siteInformationService.businessEmail;
        $scope.businessAddress = siteInformationService.businessAddress;
        $scope.files = undefined;
        $scope.businessCategories = siteInformationService.businessCategories;
        $scope.flowMainPhoto = siteInformationService.flowMainPhoto;
        $scope.flowFacadePhotos = siteInformationService.flowFacadePhotos;
        $scope.flowInsidePhotos = siteInformationService.flowInsidePhotos;
        $scope.flowProductsPhotos = siteInformationService.flowProductsPhotos;

        $scope.map = {
            center: {latitude: 4.6363623, longitude: -74.0854427}, control: {}, zoom: 9,
            events: {
                click: function (mapModel, eventName, originalEventArgs) {
                    getClickedPositionCoordinates(originalEventArgs);
                    $scope.$apply();
                },
            }
        };

        console.log("foto principal",$scope.flowMainPhoto);

        $scope.showRequiredFieldMessage = false;
        $scope.town = undefined;

        var joinOfFormatted_address;

        MapService.clearRoute();

        categories.getCategories().then(function (response) {
            $scope.categories = response;
        }).catch(function (error) {
            console.log("Hubo un error", error);
        });

        uiGmapIsReady.promise().then(function (map_instances) {
            MapService.setGMap(map_instances[0].map);
        });

        $scope.register = function () {
            var mainPhoto = 0;
            var facadePhotos = 0;
            var insidePhotos = 0;
            var productsPhotos = 0;
            var fd = new FormData();


            console.log("las fotos main", $scope.flowMainPhoto);

            appendPhotos($scope.flowMainPhoto.flow.files, mainPhoto, 'fotos_PRINCIPAL', fd);
            appendPhotos($scope.flowFacadePhotos.flow.files, facadePhotos, 'fotos_FACHADA', fd);
            appendPhotos($scope.flowInsidePhotos.flow.files, insidePhotos, 'fotos_INTERIOR', fd);
            appendPhotos($scope.flowProductsPhotos.flow.files, productsPhotos, 'fotos_PRODUCTOS', fd);

            fd.append('latitud', 4.5659418);
            fd.append('longitud', -74.5643313);
            fd.append('nombre', 'Tienda de Pepe');
            fd.append('descripcion', 'Descripcion tienda de Pepe');
            fd.append('municipio_id', 1);
            fd.append('telefono', 1234567);
            fd.append('horariolocal', 'Horario tienda de pepe');
            fd.append('correolocal', 'pepe@pepe.com');
            fd.append('ubicacionlocal', 'direccion de pepe');
            fd.append('categorias', 1);
            fd.append('usuario', 1);
            try {
                for (var i = 0; i <= $scope.tags.length - 1; i++) {
                    fd.append('tags', $scope.tags[i].text);
                }
            } catch (error) {
            }


            $http.post(API_CONFIG.url + API_CONFIG.sitio, fd,
                {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
                .success(function (d) {
                    messageService.showSuccessMessage("REGISTER_COMPLETE", "SUCCESS_TITLE_MESSAGE");
                }).error(function (error) {
                console.log("hubo n error", error);
            });
            siteAndTownSaverService.setCurrentSearchedTown(undefined);


        };

        $scope.filesChange = function (elm) {
            $scope.files = elm.files;
            $scope.$apply();
        };

        $scope.getUserPosition = function () {
            geolocation.getLocation().then(function (data) {
                var userPosition = MapService.coordsToLatLngLiteral(data.coords.latitude, data.coords.longitude);
                MapService.setPinOnUserPosition(userPosition);
            }).catch(function (error) {
                messageService.showErrorMessage("ERROR_UNAVAILABLE_LOCATION");
                console.log(error);
            });
        }

        $scope.changeView = function (view, backward) {
            if (backward == 'form') {
                if ($scope.registerSiteForm.$valid) {
                    $scope.saveSiteInformation();
                    $location.path(view);
                } else {
                    $scope.showRequiredFieldMessage = true;
                }
            }

            if(backward=='photos'){
                //$scope.saveSiteInformation();
                $location.path(view);
            }

            if(backward ==true)
            {
                $location.path(view);
            }
        };

        $scope.save = function () {
            if ($scope.registerSiteForm.$valid) {


                ngDialog.open({
                    template: 'js/registerSite/completeRegistration.html',
                    width: 'auto',
                    showClose: false,
                    scope: $scope
                });
            } else {
                $scope.showRequiredFieldMessage = true;
            }
        }


        $scope.doneRegistration = function () {
            ngDialog.close();
            $location.path('home');
        }

        function appendPhotos(arrayPhotos, photosCounter, model, fd) {
            angular.forEach(arrayPhotos, function (file) {
                fd.append(model + photosCounter, file.file);
                photosCounter++;
            });
        }

        function getClickedPositionCoordinates(originalEventArgs) {
            var e = originalEventArgs[0];
            $scope.businessLocation = {
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
            };
            getClickedPositionTown();
        }

        function getClickedPositionTown() {
            $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + $scope.businessLocation.lat + ',' + $scope.businessLocation.lng + '&sensor=true')
                .success(function (response) {
                    joinOfFormatted_address = response.results[0].formatted_address + response.results[1].formatted_address;
                    MapService.clearMarkers();
                    drawMarkerIfIsInsideBoundaries();
                });
        }

        function drawMarkerIfIsInsideBoundaries() {
            if (!joinOfFormatted_address.includes(siteAndTownSaverService.getCurrentSearchedTown().nombre)) {
                displayOutsideBoundaryErrorMessage("Verifique que la ubicación se encuentre en el municipio seleccionado");
            } else {
                MapService.addMarker($scope.businessLocation, $scope.businessName);
            }
        }

        function displayOutsideBoundaryErrorMessage(message) {
            messageService.showErrorMessage(message);
            $scope.businessLocation = undefined;
        }

        $scope.subir=function(){
            console.log("en subir", $scope.flowMainPhoto);
            siteInformationService.flowMainPhoto.flow.defaults.allowDuplicateUploads= $scope.flowMainPhoto.flow.defaults.allowDuplicateUploads;
            console.log("desde el servicio", siteInformationService.flowMainPhoto);


            setTimeout(function() {
                console.log("tiempo");
                $location.path('summary');
                $scope.$apply();
            }, 3000);


            //var deferred = $q.defer();
            //siteInformationService.flowMainPhoto = $scope.flowMainPhoto;


            /*prueba().then(function(){
                $location.path('location');
            }).catch(function(error){
                console.log("error defe", error);
            });*/


        }

        function prueba(){
            return $q(function(resolve, reject) {
                    siteInformationService.flowMainPhoto = $scope.flowMainPhoto;
                    resolve();
            });
        }

         $scope.saveSiteInformation=function() {
            console.log("en el changevoew", $scope.flowMainPhoto);
            siteInformationService.sitePhoneNumber = $scope.sitePhoneNumber;
            siteInformationService.whatsapp = $scope.whatsapp;
            siteInformationService.web = $scope.web;
            siteInformationService.openingHours = $scope.openingHours;
            siteInformationService.businessName = $scope.businessName;
            siteInformationService.businessLocation = $scope.businessLocation;
            siteInformationService.businessDescription = $scope.businessDescription;
            siteInformationService.tags = $scope.tags;
            siteInformationService.businessEmail = $scope.businessEmail;
            siteInformationService.businessAddress = $scope.businessAddress;
            siteInformationService.businessCategories = $scope.businessCategories;
            siteInformationService.flowMainPhoto = $scope.flowMainPhoto;
            siteInformationService.flowFacadePhotos = $scope.flowFacadePhotos;
            siteInformationService.flowInsidePhotos = $scope.flowInsidePhotos;
            siteInformationService.flowProductsPhotos = $scope.flowProductsPhotos;
        }

    });