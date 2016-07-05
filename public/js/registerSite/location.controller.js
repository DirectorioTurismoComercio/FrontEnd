'use strict';

angular.module('registerSite')
    .controller('locationController', function ($scope, $auth, $http, $timeout,MapService, uiGmapIsReady, messageService,
                                                    API_CONFIG, categories,
                                                    $location, MunicipiosFactory, authenticationService, siteAndTownSaverService, siteInformationService, $translate, geolocation, ngDialog, $cookies) {


        $scope.businessMunicipality = siteInformationService.businessMunicipality;
        $scope.showRequiredFieldMessage = false;
         $scope.businessLocation=siteInformationService.businessLocation;
           $scope.businessAddress= siteInformationService.businessAddress;

        var joinOfFormatted_address;
        
        MapService.clearRoute();

        $timeout(function() {
                centerMapOnSelectedTown();
            }, 100);
        


        uiGmapIsReady.promise().then(function (map_instances) {
            MapService.setGMap(map_instances[0].map);
            var townPosition = MapService.coordsToLatLngLiteral(parseFloat(siteInformationService.businessMunicipality.latitud), parseFloat(siteInformationService.businessMunicipality.longitud));
            MapService.moveMapToPosition(townPosition, 12);
        });

        $scope.getUserPosition = function () {
            geolocation.getLocation().then(function (data) {
                var userPosition = MapService.coordsToLatLngLiteral(data.coords.latitude, data.coords.longitude);
                MapService.setPinOnUserPosition(userPosition);
            }).catch(function (error) {
                messageService.showErrorMessage("ERROR_UNAVAILABLE_LOCATION");
                console.log(error);
            });
        }

        $scope.changeViewPhotos = function () {


                    if ($scope.businessLocation != undefined && $scope.businessAddress != undefined) {
                        saveDataAndChangeView('/photos');
                    } else {
                        $scope.showRequiredFieldMessage = true;
                    }
            

        };
        $scope.changeViewBusinessInformation = function () {
             $location.path('/businessinformation')
        };


       
        function saveDataAndChangeView(view){
            saveSiteInformation();
            $location.path(view);
        }

        function centerMapOnSelectedTown() {
            try {
                $scope.map = {
                    center: {
                        latitude:  parseFloat(siteInformationService.businessMunicipality.latitud),
                        longitude: parseFloat(siteInformationService.businessMunicipality.longitud)
                    }, control: {}, zoom: 9,
                    events: {
                        click: function (mapModel, eventName, originalEventArgs) {
                            getClickedPositionCoordinates(originalEventArgs);
                            $scope.$apply();
                        },
                    }
                };
            } catch (err) {
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
            $http({
                method: 'GET',
                url: API_CONFIG.getTownOnMapClickURL + $scope.businessLocation.lat+ ',' + $scope.businessLocation.lng + '&sensor=true',
                skipAuthorization: true  // `Authorization: Bearer <token>` will not be sent on this request.
            })
                .success(function (response) {
                    joinOfFormatted_address = response.results[0].formatted_address + response.results[1].formatted_address;
                    MapService.clearMarkers();
                    drawMarkerIfIsInsideBoundaries();
                }).error(function (error) {
                console.log("error", error);
            });
        }

        function drawMarkerIfIsInsideBoundaries() {
            var selectedMunicipalityName = siteInformationService.businessMunicipality.nombre;
            if (!joinOfFormatted_address.includes(selectedMunicipalityName)) {
                displayOutsideBoundaryErrorMessage("Verifique que la ubicación se encuentre en el municipio seleccionado");
            } else {
                MapService.addMarker($scope.businessLocation, siteInformationService.businessName);
            }
        }

        function displayOutsideBoundaryErrorMessage(message) {
            messageService.showErrorMessage(message);
            $scope.businessLocation = undefined;
        }

        function saveSiteInformation() {
            siteInformationService.businessLocation = $scope.businessLocation;
            siteInformationService.businessAddress = $scope.businessAddress;
        }



    });