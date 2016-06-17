'use strict';

angular.module('registerSite')
    .controller('registerSiteController', function ($scope, $http, MapService, uiGmapIsReady, messageService,
                                                    API_CONFIG, categories,
                                                    $location, MunicipiosFactory, authenticationService, siteAndTownSaverService, siteInformationService, $translate, geolocation, ngDialog) {


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
        $scope.businessCategories = siteInformationService.businessCategories;
        $scope.businessMunicipality = siteInformationService.businessMunicipality;
        $scope.flowMainPhoto = {};
        $scope.flowFacadePhotos = {};
        $scope.flowInsidePhotos = {};
        $scope.flowProductsPhotos = {};

        $scope.showRequiredFieldMessage = false;
        $scope.waitingRegister = false;

        var joinOfFormatted_address;

        MapService.clearRoute();

        categories.getCategories().then(function (response) {
            $scope.categories = response;
        }).catch(function (error) {
            console.log("Hubo un error", error);
        });


        MunicipiosFactory.getTowns().then(function (response) {
            $scope.municipalities = response;
            centerMapOnSelectedTown();
        }).catch(function (error) {
            console.log("Ocurrio un error", error);
        });

        uiGmapIsReady.promise().then(function (map_instances) {
            MapService.setGMap(map_instances[0].map);
            var townPosition = MapService.coordsToLatLngLiteral(parseFloat( $scope.municipalities[$scope.businessMunicipality].latitud), parseFloat($scope.municipalities[$scope.businessMunicipality].longitud));
            MapService.moveMapToPosition(townPosition, 12);
        });


        $scope.register = function () {
            if ($scope.registerSiteForm.$valid) {
                $scope.waitingRegister = true;
                buildSiteFormData();
                sendSiteDataToServer();
            } else {
                $scope.showRequiredFieldMessage = true;
            }
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

        $scope.changeView = function (view, logic) {
            if (logic == 'form') {
                if ($scope.registerSiteForm.$valid) {
                    saveSiteInformation();
                    $location.path(view);
                } else {
                    $scope.showRequiredFieldMessage = true;
                }
            }

            if (logic == 'photos') {
                buildSitePhotosFormData();
                $location.path(view);
            }

            if (logic == true) {
                $location.path(view);
            }
        };

        $scope.doneRegistration = function () {
            ngDialog.close();
            $location.path('home');
        }


        function centerMapOnSelectedTown(){
            try {
                $scope.map = {
                    center: {
                        latitude: $scope.businessMunicipality == undefined ? 4.6363623 : parseFloat($scope.municipalities[$scope.businessMunicipality - 1].latitud),
                        longitude: $scope.municipalities == undefined ? -74.0854427 : parseFloat($scope.municipalities[$scope.businessMunicipality - 1].longitud)
                    }, control: {}, zoom: 9,
                    events: {
                        click: function (mapModel, eventName, originalEventArgs) {
                            getClickedPositionCoordinates(originalEventArgs);
                            $scope.$apply();
                        },
                    }
                };
            }catch (err){}
        }

        function buildSiteFormData() {
            var fd = siteInformationService.formData;

            fd.append('latitud', $scope.businessLocation.lat);
            fd.append('longitud', $scope.businessLocation.lng);
            fd.append('nombre', $scope.businessName);
            fd.append('descripcion', $scope.businessDescription);
            fd.append('municipio_id', $scope.businessMunicipality);
            fd.append('telefono', $scope.sitePhoneNumber);
            fd.append('horariolocal', $scope.openingHours);
            fd.append('correolocal', $scope.businessEmail);
            fd.append('ubicacionlocal', $scope.businessAddress);
            fd.append('categorias', $scope.businessCategories.category);
            fd.append('usuario', authenticationService.getUser().id);

            try {
                for (var i = 0; i <= $scope.tags.length - 1; i++) {
                    fd.append('tags', $scope.tags[i].text);
                }
            } catch (error) {
            }
        }

        function buildSitePhotosFormData() {
            var fd = new FormData();

            appendPhotos($scope.flowMainPhoto.flow.files, 'fotos_PRINCIPAL', fd);
            appendPhotos($scope.flowFacadePhotos.flow.files, 'fotos_FACHADA', fd);
            appendPhotos($scope.flowInsidePhotos.flow.files, 'fotos_INTERIOR', fd);
            appendPhotos($scope.flowProductsPhotos.flow.files, 'fotos_PRODUCTOS', fd);
            siteInformationService.formData = fd;
        }

        function sendSiteDataToServer() {
            $http.post(API_CONFIG.url + API_CONFIG.sitio, siteInformationService.formData,
                {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                })
                .success(function (d) {
                    siteAndTownSaverService.setCurrentSearchedTown(undefined);
                    $scope.waitingRegister = false;
                    clearData();
                    ngDialog.open({
                        template: 'js/map/dialogWindowPhotos.html',
                        width: 'auto',
                        showClose: false,
                        scope: $scope,
                        closeByEscape: false,
                        closeByDocument: false
                    });
                }).error(function (error) {
                console.log("hubo un error", error);
            });
        }

        function appendPhotos(arrayPhotos, model, fd) {
            var photosCounter = 0;
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
            var selectedMunicipalityName = $scope.municipalities[$scope.businessMunicipality - 1].nombre;
            if (!joinOfFormatted_address.includes(selectedMunicipalityName)) {
                displayOutsideBoundaryErrorMessage("Verifique que la ubicación se encuentre en el municipio seleccionado");
            } else {
                MapService.addMarker($scope.businessLocation, $scope.businessName);
            }
        }

        function displayOutsideBoundaryErrorMessage(message) {
            messageService.showErrorMessage(message);
            $scope.businessLocation = undefined;
        }

        function saveSiteInformation() {
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
            siteInformationService.businessMunicipality = $scope.businessMunicipality;
        }

        function clearData() {
            siteInformationService.sitePhoneNumber = undefined;
            siteInformationService.whatsapp = undefined;
            siteInformationService.web = undefined;
            siteInformationService.openingHours = undefined;
            siteInformationService.businessName = undefined;
            siteInformationService.businessLocation = undefined;
            siteInformationService.businessDescription = undefined;
            siteInformationService.tags = undefined;
            siteInformationService.businessEmail = undefined;
            siteInformationService.businessAddress = undefined;
            siteInformationService.businessCategories = undefined;
            siteInformationService.businessMunicipality = undefined;
        }

    });