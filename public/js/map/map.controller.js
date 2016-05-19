'use strict';

angular.module('map')
    .controller('MapController', function ($scope, $window, uiGmapGoogleMapApi, uiGmapIsReady, SearchForResultsFactory,
                                           MapService, SiteMarkerService, $location, popErrorAlertService,
                                           siteAndTownSaverService, MapRouteService) {
        var userPosition = {};
        $scope.selectedSite = null;
        $scope.isShowingSiteDetail = false;
        $scope.loading = false;
        $scope.foundSites = [];
        $scope.map = {
            center: {
                latitude: siteAndTownSaverService.getCurrentSearchedTown()==undefined ? 4.6363623 : parseFloat(siteAndTownSaverService.getCurrentSearchedTown().latitud),
                longitude: siteAndTownSaverService.getCurrentSearchedTown()==undefined ? -74.0854427 : parseFloat(siteAndTownSaverService.getCurrentSearchedTown().longitud)
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
            if (MapRouteService.setOriginAndDestinationdata($scope.routeToController.routeFrom, $scope.routeToController.routeTo)) {
                showRoute();
            }
        };

        $scope.goToUserPosition = function () {
            $scope.routeToController.routeFrom = "Mi posición actual";
            MapService.getUserPosition(setUserPositionAsRouteOrigin, handleLocationError);
        };

        $scope.hideSiteDetail = function () {
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
            if (result != undefined) {
                $scope.hideSiteDetail();
                $scope.loading = true;
                var selectedTown = siteAndTownSaverService.getCurrentSearchedTown();
                if (selectedTown != undefined) {
                    centerMap(selectedTown);
                }
                drawSitesByKeyWord(result);
            }
            else {
                popErrorAlertService.showPopErrorAlert("Por favor ingrese un criterio de busqueda");
            }
        };

        $scope.showRouteToSite = function (site) {
            $scope.loading = true;
            SiteMarkerService.deleteMarkers();
            MapService.getUserPosition(function (position) {
                var destination = MapService.coordsToLatLng(parseFloat(site.latitud), parseFloat(site.longitud));
                var origin = MapService.coordsToLatLng(position.coords.latitude, position.coords.longitude);
                MapRouteService.calulateRoute(origin, destination, $scope);
            }, handleLocationError);
        };

        function centerMap(selectedTown) {
            if ((selectedTown.nombre).indexOf('Cundinamarca') == -1) {
                centerMapToSelectedTown(selectedTown);
            } else {
                centerMapToCundinamrca();
            }
        }

        function centerMapToSelectedTown(selectedTown) {
            var townPosition = MapService.coordsToLatLng(parseFloat(selectedTown.latitud), parseFloat(selectedTown.longitud));
            MapService.moveMapToPosition(townPosition, 12);
        }

        function centerMapToCundinamrca() {
            var cundinamarcaPosition = MapService.coordsToLatLng($scope.map.center.latitude, $scope.map.center.longitude);
            MapService.moveMapToPosition(cundinamarcaPosition, 9);
        }

        function drawSitesByKeyWord(result) {
            SearchForResultsFactory.doSearch(result).then(function (response) {
                if (response.length > 0) {
                    SiteMarkerService.deleteMarkers();
                    showFoundPlaces();
                    $scope.loading = false;
                } else {
                    popErrorAlertService.showPopErrorAlert("No se han encontrado resultados");
                    $scope.loading = false;
                }
            }).catch(function (error) {
                console.log("ocurrio un error", error);
            });
        }

        function showFoundPlaces() {
            var sites = SearchForResultsFactory.getResults();
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
            MapService.moveMapToPosition(userPosition, 12);
            MapService.addMarker(userPosition);
        }

        function handleLocationError() {
            popErrorAlertService.showPopErrorAlert("No es posible obtener la ubicación");
        }
    })
;