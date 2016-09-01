'use strict';

angular.module('Municipality')
    .controller('municipalityLocationController', function ($scope, $location, municipalityInformationService, $timeout, MapService, uiGmapIsReady, messageService, API_CONFIG, $http) {

        $scope.municipalitySelected = municipalityInformationService.getMunicipalitySelected();
        $scope.municipalityAddress = municipalityInformationService.getMunicipalityAddress();
        $scope.municipalityLocation = municipalityInformationService.getMunicipalityLocation();

        $scope.showRequiredFieldMessage = false;

        var joinOfFormatted_address;

        MapService.clearRoute();

        $timeout(function () {
            centerMapOnSelectedTown();
        }, 100);

        uiGmapIsReady.promise().then(function (map_instances) {
            MapService.setGMap(map_instances[0].map);
            var townPosition = MapService.coordsToLatLngLiteral(parseFloat(municipalityInformationService.getMunicipalitySelected().latitud), parseFloat(municipalityInformationService.getMunicipalitySelected().longitud));
            MapService.moveMapToPosition(townPosition, 12);
            setSearchedPinOnMap();
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

        $scope.goMunicipalityInfo=function(){
            $location.path('/municipalityinfo');
        }


        $scope.changeViewPhotos = function () {
            if ($scope.municipalityLocation != undefined && $scope.municipalityAddress != undefined) {
                saveDataAndChangeView('/municiplaityphotos');
            } else {
                $scope.showRequiredFieldMessage = true;
            }
        };


        function setSearchedPinOnMap(){
            if ($scope.municipalityLocation != undefined) {
                MapService.addMarker($scope.municipalityLocation, municipalityInformationService.getMunicipalitySelected().nombre);
            }
        }

        function centerMapOnSelectedTown() {
            try {
                $scope.map = {
                    center: {
                        latitude: parseFloat(municipalityInformationService.getMunicipalitySelected().latitud),
                        longitude: parseFloat(municipalityInformationService.getMunicipalitySelected().longitud)
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
            $scope.municipalityLocation = {
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
            };
            getClickedPositionTown();
        }

        function getClickedPositionTown() {
            $http({
                method: 'GET',
                url: API_CONFIG.getTownOnMapClickURL + $scope.municipalityLocation.lat + ',' + $scope.municipalityLocation.lng + '&sensor=true',
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
            var selectedMunicipalityName = municipalityInformationService.getMunicipalitySelected().nombre;
            if (!joinOfFormatted_address.includes(selectedMunicipalityName)) {
                displayOutsideBoundaryErrorMessage("Verifique que la ubicación se encuentre en el municipio seleccionado");
            } else {
                MapService.addMarkerMunicipalityWithIcon($scope.municipalityLocation);
            }
        }

        function displayOutsideBoundaryErrorMessage(message) {
            messageService.showErrorMessage(message);
            $scope.municipalityLocation = undefined;
        }

        function saveDataAndChangeView(view) {
            saveSiteInformation();
            $location.path(view);
        }

        function saveSiteInformation() {
            municipalityInformationService.setMunicipalityAddress($scope.municipalityAddress);
            municipalityInformationService.setMunicipalityLocation($scope.municipalityLocation);
        }


    });