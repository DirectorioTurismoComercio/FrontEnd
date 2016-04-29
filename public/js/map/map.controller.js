'use strict';

angular.module('map')
    .controller('MapController', function ($scope, $window, uiGmapGoogleMapApi, uiGmapIsReady, SearchForResultsFactory,
                                           MapService, SiteMarkerService, $location, popErrorAlertService,
                                           siteAndTownSaverService, MapRouteService) {
        var userPosition = {};
        $scope.selectedSite = null;
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
        $scope.routeToController = {
            routeFrom: '',
            routeTo: ''
        }


        uiGmapIsReady.promise().then(initMap);

        function initMap() {
            MapService.setGMap($scope.map.control.getGMap());

            if (siteAndTownSaverService.getCurrentSearchedSite() != undefined) {
                showFoundPlaces();
            }

            if (siteAndTownSaverService.getOrigin() != undefined) {
                showRoute();
            }
        }

        $scope.calculateRoute = function () {
            if ($scope.routeToController.routeFrom == '' || $scope.routeToController.routeTo == '') {
                popErrorAlertService.showPopErrorAlert("Indique un punto de partida y un destino");
            } else {
                if ($scope.routeToController.routeFrom != "Mi posición actual") {
                    siteAndTownSaverService.setOrigin($scope.routeToController.routeFrom.formatted_address);
                }
                siteAndTownSaverService.setDestination($scope.routeToController.routeTo.formatted_address);
                showRoute();
            }
        };

        $scope.goToUserPosition = function () {
            $scope.routeToController.routeFrom = "Mi posición actual";
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
                var map = MapService.getGMap();

                userPosition = MapService.coordsToLatLng(position.coords.latitude, position.coords.longitude);
                var origin = userPosition.lat + "," + userPosition.lng;

                MapService.addMarker(userPosition);
                MapRouteService.calulateRoute(origin, destination, $scope);
            }, handleLocationError);
        };

        function showFoundPlaces() {
            var sites = SearchForResultsFactory.getResults();
            var map = MapService.getGMap();
            $scope.foundSites = sites;

            if (sites != undefined) {
                for (var i = 0; i < sites.length; i++) {
                    var site = sites[i];
                    var position = MapService.coordsToLatLng(parseFloat(site.latitud), parseFloat(site.longitud));
                    var marker = MapService.addMarker(position, site.nombre);

                    SiteMarkerService.addSiteMarker(site, marker, $scope.showSiteDetail);
                }
            }
        }

        function showRoute() {
            $scope.loading = true;
            SiteMarkerService.deleteMarkers();
            MapRouteService.calulateRoute(siteAndTownSaverService.getOrigin(), siteAndTownSaverService.getDestination(), $scope);
            MapService.clearMarkers();
        }


        function setUserPositionAsRouteOrigin(position) {
            userPosition = MapService.coordsToLatLng(position.coords.latitude, position.coords.longitude);
            siteAndTownSaverService.setOrigin(userPosition);
            MapService.moveMapToPosition(userPosition);
            MapService.addMarker(userPosition);
        }

        function handleLocationError() {
            popErrorAlertService.showPopErrorAlert("No es posible obtener la ubicación");
        }
    })
;