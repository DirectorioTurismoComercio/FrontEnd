'use strict';

angular.module('map')
    .controller('MapController', function ($scope, $window, uiGmapGoogleMapApi, uiGmapIsReady,
                                           SearchForResultsFactory, MapService, CUNDINAMARCA_COORDS
                                           , SiteMarkerService, $location) {
        var MY_LOCATION = 'Mi Ubicación';
        var routeOriginInput = document.getElementById('routeOrigin');
        var routeDestinationInput = document.getElementById('routeDestination');
        var directionsDisplay;
        var directionsService;
        var userPosition = {};

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
            var userCoords = userPosition.lat + "," + userPosition.lng;
            var origin = routeOriginInput.value == MY_LOCATION ? userCoords : routeOriginInput.value;
            var destination = routeDestinationInput.value;

            MapService.calulateRoute(origin, destination, directionsService, directionsDisplay);
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
            SearchForResultsFactory.doSearch(result).then(function (response) {
                if (response.length > 0) {
                    showFoundPlaces()
                } else {
                    showEmptyResultMessage("No se han encontrado resultados");
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
                    var marker = MapService.addMarker(map, position);
                    SiteMarkerService.createSiteMarker(site,marker,map);                                                    
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

            /*Dibujo del poligono de cundinamarca, solo para muestra en desarrollo. Se quitará mas adelante*/
            var cundinamarcaPolygon = new google.maps.Polygon({
                strokeColor: '#FF0000',
                strokeOpacity: 0.1,
                strokeWeight: 2,
                fillColor: '#bbffff',
                paths: CUNDINAMARCA_COORDS,
                map: $scope.map.control.getGMap()
            });
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