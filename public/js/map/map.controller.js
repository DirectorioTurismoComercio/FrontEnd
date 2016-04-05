'use strict';

angular.module('map')
    .controller('MapController', function ($scope, $window, uiGmapGoogleMapApi, uiGmapIsReady,
                                           SearchForResultsFactory, MapService) {
        var MY_LOCATION = 'Mi Ubicación';
        var routeOriginInput = document.getElementById('from');
        var routeDestinationInput = document.getElementById('to');
        var directionsDisplay;
        var directionsService;
        var userPosition = {};

        $scope.routeFrom = '';
        $scope.routeTo = '';
        $scope.map = {
            center: {
                latitude: 4.6363623,
                longitude: -74.0854427
            },
            control: {},
            zoom: 9
        };


        uiGmapGoogleMapApi.then(initServices);
        uiGmapIsReady.promise().then(initMap);

        $scope.calculateRoute = function () {
            var userCoords = userPosition.lat + "," + userPosition.lng;
            var origin = routeOriginInput.value == MY_LOCATION ? userCoords : routeOriginInput.value;
            var destination = routeDestinationInput.value;


            MapService.calulateRoute(origin, destination, directionsService, directionsDisplay);
        }

        $scope.goToUserPosition = function () {
            MapService.getUserPosition(setUserPositionAsRouteOrigin, handleLocationError);
        }


        function showPlacesFound() {
            var sites = SearchForResultsFactory.getResults();
            var map = $scope.map.control.getGMap();

            if (sites != undefined) {
                for (var i = 0; i < sites.length; i++) {
                    var site = sites[i];
                    var position = MapService.coordsToLatLng(parseFloat(site.latitud), parseFloat(site.longitud));
                    MapService.addMarker(map, position);
                }
            }
        }

        function initServices(GMapApi) {
            directionsDisplay = new GMapApi.DirectionsRenderer();
            directionsService = new GMapApi.DirectionsService();
        }

        function initMap() {
            var routeFromAutocomplete = MapService.addAutocompleteFeature(routeOriginInput);
            var routeToAutocomplete = MapService.addAutocompleteFeature(routeDestinationInput);

            MapService.addPlaceChangedListener(routeFromAutocomplete, routeOriginInput, checkAllowedPlace)
            MapService.addPlaceChangedListener(routeToAutocomplete, routeDestinationInput, checkAllowedPlace)
            directionsDisplay.setMap($scope.map.control.getGMap());
            showPlacesFound();
        }

        function checkAllowedPlace(autocomplete, inputBox) {
            var latitude = autocomplete.getPlace().geometry.location.lat();
            var longitude = autocomplete.getPlace().geometry.location.lng();

            if (!MapService.isPlaceInCundinamarca(latitude, longitude)) {
                alert("El lugar seleccionado no esta disponible por el momento");
                inputBox.value = '';
            }
        }

        function setUserPositionAsRouteOrigin(position) {
            var map = $scope.map.control.getGMap();
            $scope.routeFrom = MY_LOCATION;
            userPosition = MapService.coordsToLatLng(position.coords.latitude, position.coords.longitude);

            MapService.addMarker(map, userPosition)
            map.setCenter(userPosition);
            map.setZoom(15);
        }

        function handleLocationError() {
            alert("No es posible obtener la ubicación");
        }

        $scope.clearRouteFrom = function () {
            $scope.routeFrom = '';
        }

        $scope.clearRouteTo = function () {
            $scope.routeTo = '';
        }
    })
;