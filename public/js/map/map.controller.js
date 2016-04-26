'use strict';

angular.module('map')
    .controller('MapController', function ($scope, $window, uiGmapGoogleMapApi, uiGmapIsReady,
                                           SearchForResultsFactory, MapService, CUNDINAMARCA_COORDS, SiteMarkerService,
                                           $location, popErrorAlertService, $routeParams) {
        var MY_LOCATION = 'Mi Ubicación';
        var routeOriginInput = document.getElementById('routeOrigin');
        var routeDestinationInput = document.getElementById('routeDestination');
        var directionsDisplay;
        var directionsService;
        var userPosition = {};
        $scope.selectedSite = null;


        var highlightedMarker = null;
        $scope.isShowingSiteDetail = false;

        $scope.loading = false;
        $scope.foundSites = [{name: 'nombre', description: 'desc'}];
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
            $scope.loading = true;
            var userCoords = userPosition.lat + "," + userPosition.lng;
            var origin = routeOriginInput.value == MY_LOCATION ? userCoords : routeOriginInput.value;
            var destination = routeDestinationInput.value;
            var map = $scope.map.control.getGMap();

            console.log(origin);
            console.log(destination);
            SiteMarkerService.deleteMarkers();
            MapService.calulateRoute(origin, destination, directionsService, directionsDisplay, map, $scope);
        };

        $scope.goToUserPosition = function () {
            MapService.getUserPosition(setUserPositionAsRouteOrigin, handleLocationError);
        };

        $scope.clearRouteOrigin = function () {
            $scope.routeOrigin = '';
        };

        $scope.clearRouteDestination = function () {
            $scope.routeDestination = '';
        };

        $scope.hideSiteDetail = function (siteIndex) {
            SiteMarkerService.clearSelectedMarker();
            $scope.isShowingSiteDetail = false;

        };

        $scope.clearHighLightedMarker = function (index) {
            if (!$scope.isShowingSiteDetail) {
                SiteMarkerService.clearHighLightedMarkerByIndex(index);
            }
        };

        $scope.highLightMarker = function (index) {
            SiteMarkerService.highLightMarkerByIndex(index);
        };

        $scope.showSiteDetail = function (site, index) {
            if (index) {
                SiteMarkerService.highLightMarkerByIndex(index);
            }
            $scope.isShowingSiteDetail = true;
            $scope.selectedSite = site;
            $scope.$apply();
        };

        $scope.doSearch = function (result) {
            $scope.loading = true;
            SearchForResultsFactory.doSearch(result).then(function (response) {
                if (response.length > 0) {
                    SiteMarkerService.deleteMarkers();
                    showFoundPlaces();
                    $scope.loading = false;
                } else {
                    popErrorAlertService.showPopErrorAlert("No se han encontrado resultados");
                }
            }).catch(function (error) {
                console.log("ocurrio un error", error);
            });
        };

        $scope.calcRouteFromUserPosition = function (site) {
            MapService.getUserPosition(setUserPositionAsRouteOrigin, handleLocationError);
            routeDestinationInput.value = site.latitud + "," + site.longitud;
            $scope.calculateRoute();
        };

        function showFoundPlaces() {
            var sites = SearchForResultsFactory.getResults();
            $scope.foundSites = sites;
            var map = $scope.map.control.getGMap();
            if (sites != undefined) {
                for (var i = 0; i < sites.length; i++) {
                    var site = sites[i];
                    var position = MapService.coordsToLatLng(parseFloat(site.latitud), parseFloat(site.longitud));
                    var marker = MapService.addMarker(map, position, site.nombre);

                    SiteMarkerService.addSiteMarker(site, marker, map, $scope.showSiteDetail);

                }
            }

        }


        function initServices(GMapApi) {
            directionsDisplay = new GMapApi.DirectionsRenderer();
            directionsService = new GMapApi.DirectionsService();
        }

        function showSearchedRoute() {
            switch ($location.$$path) {
                case '/map/searchRoute':
                    console.log("route");
                    break;
                case '/map/searchKeyword':
                    console.log("keyword");
                    break;
            }
        }

        function initMap() {
            var routeFromAutocomplete = MapService.addAutocompleteFeature(routeOriginInput);
            var routeToAutocomplete = MapService.addAutocompleteFeature(routeDestinationInput);

            MapService.addPlaceChangedListener(routeFromAutocomplete, routeOriginInput, checkAllowedPlace)
            MapService.addPlaceChangedListener(routeToAutocomplete, routeDestinationInput, checkAllowedPlace)
            directionsDisplay.setMap($scope.map.control.getGMap());
            showSearchedRoute();
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

            MapService.addMarker(map, userPosition);
            map.setCenter(userPosition);
            map.setZoom(15);
        }

        function handleLocationError() {
            alert("No es posible obtener la ubicación");
        }
    })
;