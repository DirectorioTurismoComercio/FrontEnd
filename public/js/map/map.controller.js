'use strict';

angular.module('map')
    .controller('MapController', function ($scope, $window, uiGmapGoogleMapApi, uiGmapIsReady,
                                           SearchForResultsFactory, MapService, CUNDINAMARCA_COORDS
        , SiteMarkerService, $location, popErrorAlertService) {
        var MY_LOCATION = 'Mi Ubicación';
        var routeOriginInput = document.getElementById('routeOrigin');
        var routeDestinationInput = document.getElementById('routeDestination');
        var directionsDisplay;
        var directionsService;
        var userPosition = {};
        var markers = [];
        $scope.loading=false;

        $scope.routeOrigin = '';
        $scope.routeDestination = '';
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
            $scope.loading=true;
            var userCoords = userPosition.lat + "," + userPosition.lng;
            var origin = routeOriginInput.value == MY_LOCATION ? userCoords : routeOriginInput.value;
            var destination = routeDestinationInput.value;

            var map = $scope.map.control.getGMap();
            markers=MapService.deleteMarkers(markers);
            MapService.calulateRoute(origin, destination, directionsService, directionsDisplay, map, markers, $scope);
        }

        $scope.goToUserPosition = function () {
            MapService.getUserPosition(setUserPositionAsRouteOrigin, handleLocationError);
        }

        $scope.clearRouteOrigin = function () {
            $scope.routeOrigin = '';
        }

        $scope.clearRouteDestination = function () {
            $scope.routeDestination = '';
        }

        $scope.doSearch = function (result) {
            $scope.loading=true;
            SearchForResultsFactory.doSearch(result).then(function (response) {
                if (response.length > 0) {
                    markers=MapService.deleteMarkers(markers);
                    showFoundPlaces();
                    $scope.loading=false;
                } else {
                    popErrorAlertService.showPopErrorAlert("No se han encontrado resultados");
                }
            }).catch(function (error) {
                console.log("ocurrio un error", error);
            });
        }

        function showFoundPlaces() {
            var sites = SearchForResultsFactory.getResults();
            var map = $scope.map.control.getGMap();
            if (sites != undefined) {
                for (var i = 0; i < sites.length; i++) {
                    var site = sites[i];
                    var position = MapService.coordsToLatLng(parseFloat(site.latitud), parseFloat(site.longitud));
                    var marker = MapService.addMarker(map, position, site.nombre);

                    SiteMarkerService.createSiteMarker(site, marker, map);
                    markers.push(marker);
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
            showFoundPlaces();
        }

        function checkAllowedPlace(autocomplete, inputBox) {
            var latitude = autocomplete.getPlace().geometry.location.lat();
            var longitude = autocomplete.getPlace().geometry.location.lng();

            if (!MapService.isPlaceInCundinamarca(latitude, longitude, $scope.map.control.getGMap())) {
                alert("El lugar seleccionado no esta disponible por el momento");
                inputBox.value = '';
            }
        }

        function setUserPositionAsRouteOrigin(position) {
            var map = $scope.map.control.getGMap();
            $scope.routeOrigin = MY_LOCATION;
            userPosition = MapService.coordsToLatLng(position.coords.latitude, position.coords.longitude);

            MapService.addMarker(map, userPosition)
            map.setCenter(userPosition);
            map.setZoom(15);
        }

        function handleLocationError() {
            alert("No es posible obtener la ubicación");
        }
    });