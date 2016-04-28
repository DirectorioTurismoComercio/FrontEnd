'use strict';

angular.module('map')
    .controller('MapController', function ($scope, $window, uiGmapGoogleMapApi, uiGmapIsReady,
                                           SearchForResultsFactory, MapService, CUNDINAMARCA_COORDS, SiteMarkerService,
                                           $location, popErrorAlertService, siteAndTownSaverService) {
        var directionsDisplay;
        var directionsService;
        var userPosition = {};
        $scope.selectedSite = null;


        var highlightedMarker = null;
        $scope.isShowingSiteDetail = false;

        $scope.loading = false;
        $scope.foundSites = [{name: 'nombre', description: 'desc'}];
        $scope.map = {
            center: {
                latitude: 4.6363623,
                longitude: -74.0854427
            },
            control: {},
            zoom: 9
        };
        $scope.routeToController={
            routeFrom:'',
            routeTo:''
        }


        uiGmapGoogleMapApi.then(initServices);

        function initServices(GMapApi) {
            directionsDisplay = new GMapApi.DirectionsRenderer();
            directionsService = new GMapApi.DirectionsService();
        }


        uiGmapIsReady.promise().then(initMap);

        function initMap() {
            directionsDisplay.setMap($scope.map.control.getGMap());

            if(siteAndTownSaverService.getCurrentSearchedSite()!=undefined){
                showFoundPlaces();
            }

            if(siteAndTownSaverService.getOrigin()!=undefined){
                showSearchedRoute();
            }
        }

        $scope.calculateRoute = function () {
            if($scope.routeToController.routeFrom=='' || $scope.routeToController.routeTo==''){
                popErrorAlertService.showPopErrorAlert("Indique un punto de partida y un destino");
            }else {
                if ($scope.routeToController.routeFrom!="Mi posición actual") {
                    siteAndTownSaverService.setOrigin($scope.routeToController.routeFrom.formatted_address);
                }
                siteAndTownSaverService.setDestination($scope.routeToController.routeTo.formatted_address);
                var map = $scope.map.control.getGMap();
                $scope.loading = true;
                SiteMarkerService.deleteMarkers();
                MapService.calulateRoute(siteAndTownSaverService.getOrigin(), siteAndTownSaverService.getDestination(), directionsService, directionsDisplay, map, $scope);
            }
        };

        $scope.goToUserPosition = function () {
            $scope.routeToController.routeFrom="Mi posición actual";
            MapService.getUserPosition(setUserPositionAsRouteOrigin, handleLocationError);
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

        $scope.showRouteToSite = function (site) {
            MapService.getUserPosition(function (position) {
                var destination = site.latitud + "," + site.longitud;
                var map = $scope.map.control.getGMap();

                userPosition = MapService.coordsToLatLng(position.coords.latitude, position.coords.longitude);
                var origin = userPosition.lat + "," + userPosition.lng;

                MapService.addMarker(map, userPosition);
                MapService.calulateRoute(origin, destination, directionsService, directionsDisplay, map, $scope);
            }, handleLocationError);
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

        function showSearchedRoute() {
            $scope.loading = true;
            var map = $scope.map.control.getGMap();
            var origin=siteAndTownSaverService.getOrigin();
            var destination=siteAndTownSaverService.getDestination();
            SiteMarkerService.deleteMarkers();
            MapService.calulateRoute(origin, destination, directionsService, directionsDisplay, map, $scope);
        }


        function setUserPositionAsRouteOrigin(position) {
            var map = $scope.map.control.getGMap();
            userPosition = MapService.coordsToLatLng(position.coords.latitude, position.coords.longitude);
            siteAndTownSaverService.setOrigin(userPosition);

            MapService.addMarker(map, userPosition);
            map.setCenter(userPosition);
            map.setZoom(15);
        }

        function handleLocationError() {
            popErrorAlertService.showPopErrorAlert("No es posible obtener la ubicación");
        }
    })
;