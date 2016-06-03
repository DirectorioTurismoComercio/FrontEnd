'use strict';

angular.module('registerSite')
    .controller('registerSiteController', function ($scope, $http, MapService, uiGmapIsReady, messageService, CUNDINAMARCA_COORDS,
                                                    BOGOTA_COORDS, API_CONFIG, categories,
                                                    $location, authenticationService, siteAndTownSaverService, siteInformationService, $translate, geolocation) {

        $scope.sitePhoneNumber = siteInformationService.sitePhoneNumber;
        $scope.whatsapp = siteInformationService.whatsapp;
        $scope.openingHours = siteInformationService.openingHours;
        $scope.businessName = siteInformationService.businessName;
        $scope.businessLocation = siteInformationService.businessLocation;
        $scope.businessDescription = siteInformationService.businessDescription;
        $scope.tags = siteInformationService.tags;
        $scope.businessEmail = siteInformationService.businessEmail;
        $scope.businessAddress = siteInformationService.businessAddress;
        $scope.files = undefined;
        $scope.businessCategories = siteInformationService.businessCategories;

        $scope.map = {
            center: {latitude: 4.6363623, longitude: -74.0854427}, control: {}, zoom: 9,
            events: {
                click: function (mapModel, eventName, originalEventArgs) {
                    getClickedPositionCoordinates(originalEventArgs);
                    $scope.$apply();
                },
            }
        };

        $scope.flowPhotos = {};

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

        $scope.subir = function () {
            console.log("El arreglo del flow", $scope.flowPhotos);
        }

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


        $scope.register = function () {


            var fd = new FormData();
            var i = 0;
            angular.forEach($scope.files, function (file) {
                fd.append('foto' + i, file);
                i++;
            });

            fd.append('latitud', $scope.businessLocation.lat);
            fd.append('longitud', $scope.businessLocation.lng);
            fd.append('nombre', $scope.businessName);
            fd.append('descripcion', $scope.businessDescription);
            fd.append('municipio', siteAndTownSaverService.getCurrentSearchedTown().id);
            fd.append('telefono', $scope.sitePhoneNumber);
            fd.append('horariolocal', $scope.openingHours);
            fd.append('correolocal', $scope.businessEmail);
            fd.append('ubicacionlocal', $scope.businessAddress);
            fd.append('categorias', $scope.businessCategories.category);
            fd.append('usuario', 1);
            for (var i = 0; i <= $scope.tags.length - 1; i++) {
                fd.append('tags', $scope.tags[i].text);
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

        $scope.changeView = function (view) {
            if($scope.registerSiteForm.$valid){
                saveSiteInformation();
                $location.path(view);
            }

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

        function saveSiteInformation(){
            siteInformationService.sitePhoneNumber = $scope.sitePhoneNumber;
            siteInformationService.whatsapp = $scope.whatsapp;
            siteInformationService.openingHours = $scope.openingHours;
            siteInformationService.businessName = $scope.businessName;
            siteInformationService.businessLocation = $scope.businessLocation;
            siteInformationService.businessDescription = $scope.businessDescription;
            siteInformationService.tags = $scope.tags;
            siteInformationService.businessEmail = $scope.businessEmail;
            siteInformationService.businessAddress = $scope.businessAddress;
            siteInformationService.businessCategories = $scope.businessCategories;
        }
    });