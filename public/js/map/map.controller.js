'use strict';

angular.module('map')
    .controller('MapController', function ($scope, $window, uiGmapGoogleMapApi, uiGmapIsReady, SearchForResultsFactory,
                                           MapService, SiteMarkerService, $location, messageService,
                                           siteAndTownSaverService, MapRouteService, CUNDINAMARCA_COORDS) {
        var userPosition = {};
        $scope.selectedSite = null;
        $scope.isShowingSiteDetail = false;
        $scope.loading = false;
        $scope.foundSites = [];
        $scope.map = {
            center: {
                latitude: siteAndTownSaverService.getCurrentSearchedTown() == undefined ? 4.6363623 : parseFloat(siteAndTownSaverService.getCurrentSearchedTown().latitud),
                longitude: siteAndTownSaverService.getCurrentSearchedTown() == undefined ? -74.0854427 : parseFloat(siteAndTownSaverService.getCurrentSearchedTown().longitud)
            },
            control: {},
            zoom: 9
        };
        $scope.routeToController = {
            routeFrom: '',
            routeTo: ''
        };


        uiGmapIsReady.promise().then(initMap);

        function initMap() {
            MapService.setGMap($scope.map.control.getGMap());
            setCundinamarcaPolygon();

            if (siteAndTownSaverService.getCurrentSearchedSite() != undefined) {
                showFoundPlaces();
            }

            showSearchedRoute();
        }


        function showSearchedRoute() {
            if (siteAndTownSaverService.searchedRoute.origin != undefined) {
                $scope.loading = true;
                SiteMarkerService.deleteMarkers();
                MapRouteService.calculateRoute(siteAndTownSaverService.searchedRoute, $scope);
                MapService.clearMarkers();
            }
        }

        $scope.showRoute = function () {
            showSearchedRoute();
        }

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
                messageService.showErrorMessage("Por favor ingrese un criterio de busqueda");
            }
        };

        $scope.showRouteToSite = function (site) {
            $scope.loading = true;
            SiteMarkerService.deleteMarkers();
            MapService.getUserPosition(function (position) {
                var routeRequest = {
                    destination: MapService.coordsToLatLngLiteral(parseFloat(site.latitud), parseFloat(site.longitud)),
                    origin: MapService.coordsToLatLngLiteral(position.coords.latitude, position.coords.longitude)
                };
                MapRouteService.calculateRoute(routeRequest, $scope);
            }, handleLocationError);
        };

        function setCundinamarcaPolygon() {
            new google.maps.Polygon({
                strokeColor: '#FF0000',
                strokeOpacity: 0.1,
                strokeWeight: 2,
                fillColor: '#bbffff',
                paths: CUNDINAMARCA_COORDS,
                map: $scope.map.control.getGMap()
            });
        }

        function centerMap(selectedTown) {
            if ((selectedTown.nombre).indexOf('Cundinamarca') == -1) {
                centerMapToSelectedTown(selectedTown);
            } else {
                centerMapToCundinamrca();
            }
        }

        function centerMapToSelectedTown(selectedTown) {
            var townPosition = MapService.coordsToLatLngLiteral(parseFloat(selectedTown.latitud), parseFloat(selectedTown.longitud));
            MapService.moveMapToPosition(townPosition, 12);
        }

        function centerMapToCundinamrca() {
            var cundinamarcaPosition = MapService.coordsToLatLngLiteral($scope.map.center.latitude, $scope.map.center.longitude);
            MapService.moveMapToPosition(cundinamarcaPosition, 9);
        }

        function drawSitesByKeyWord(result) {
            SearchForResultsFactory.doSearch(result).then(function (response) {
                if (response.length > 0) {
                    SiteMarkerService.deleteMarkers();
                    showFoundPlaces();
                    $scope.loading = false;
                } else {
                    messageService.showErrorMessage("No se han encontrado resultados");
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
                    var position = MapService.coordsToLatLngLiteral(parseFloat(site.latitud), parseFloat(site.longitud));
                    var marker = MapService.addMarker(position, site.nombre);

                    SiteMarkerService.addSiteMarker(site, marker, $scope.showSiteDetail);
                }
            }
        }


        function setUserPositionAsRouteOrigin(position) {
            userPosition = MapService.coordsToLatLngLiteral(position.coords.latitude, position.coords.longitude);
            siteAndTownSaverService.setOrigin(userPosition);
            MapService.moveMapToPosition(userPosition, 12);
            MapService.addMarker(userPosition);
        }

        function handleLocationError() {
            messageService.showErrorMessage("No es posible obtener la ubicación");
        }
    })
;