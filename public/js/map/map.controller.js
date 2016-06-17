'use strict';

angular.module('map')
    .controller('MapController', function ($scope, $window, uiGmapGoogleMapApi, uiGmapIsReady, SearchForResultsFactory,
                                           MapService, ngDialog, SiteMarkerService, $location, messageService, $timeout,
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
        $scope.resulListInCompactMode = false;

        uiGmapIsReady.promise().then(initMap);

        function initMap() {
            MapService.setGMap($scope.map.control.getGMap());
            setCundinamarcaPolygon();

            if (siteAndTownSaverService.getCurrentSearchedSite() != undefined) {
                showFoundPlaces();
            }
            //showFoundPlaces();

            if (siteAndTownSaverService.searchedRoute.origin != undefined && siteAndTownSaverService.getCurrentSearchedSite() == undefined) {
                showSearchedRoute();
            }
        }

        function reloadMap() {
            $timeout(function () {
                google.maps.event.trigger($scope.map.control.getGMap(), 'resize');
            });
        }


        function showSearchedRoute() {
            $scope.loading = true;
            $scope.resulListInCompactMode = true;
            reloadMap();
            SiteMarkerService.deleteMarkers();
            MapRouteService.calculateRoute(siteAndTownSaverService.searchedRoute, $scope);
            MapService.clearMarkers();
        }

        $scope.showRoute = function () {
            showSearchedRoute();
        }


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

        $scope.showSiteInOtherView = function (site, index) {
            //Launch view
        };

        $scope.doSearch = function (result) {
            $scope.resulListInCompactMode = false;
            MapService.clearRoute();
            if (result != undefined) {
                $scope.hideSiteDetail();
                $scope.loading = true;
                drawSitesByKeyWord(result);
            }
            else {
                messageService.showErrorMessage("Por favor ingrese un criterio de busqueda");
            }
        };

        $scope.showRouteToSite = function (site) {
            $scope.loading = true;
            $scope.resulListInCompactMode = true;
            reloadMap();
            SiteMarkerService.deleteMarkers();
            MapService.getUserPosition(function (position) {
                    var routeRequest = {
                        origin: {
                            location: MapService.geolocationToLatLngLiteral(position.coords)
                        },
                        destination: {
                            location: MapService.coordsToLatLngLiteral(parseFloat(site.latitud), parseFloat(site.longitud))
                        }
                    };

                    MapRouteService.calculateRoute(routeRequest, $scope);
                }, handleLocationError
            );
        }
        ;

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
                SiteMarkerService.deleteMarkers();
                if (response.length > 0) {
                    showFoundPlaces();
                    $scope.loading = false;
                } else {
                    $scope.foundSites=0;
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
            var selectedTown = siteAndTownSaverService.getCurrentSearchedTown();
            if (selectedTown != undefined) {
                centerMap(selectedTown);
            }
            if (sites != undefined) {
                for (var i = 0; i < sites.length; i++) {
                    var site = sites[i];
                    var position = MapService.coordsToLatLngLiteral(parseFloat(site.latitud), parseFloat(site.longitud));
                    var marker = MapService.addMarkerWithCategoryIcon(position, site.nombre, site.categorias[0]);

                    SiteMarkerService.addSiteMarker(site, marker, $scope.showSiteDetail);
                }
            }
        }

        function handleLocationError() {
            messageService.showErrorMessage("No es posible obtener la ubicación");
        }

        $scope.isMobileDevice = function () {
            return $window.innerWidth < 992;
        };

        $scope.showResultListHorizontally = function () {
            return $scope.isMobileDevice() && $scope.resulListInCompactMode;
        };
        $scope.openDialogWindowPhotos = function () {
   
             ngDialog.open({
                        template: 'js/map/dialogWindowPhotos.html',
                        width: 'auto',
                        showClose: false,
                        scope: $scope,
                        closeByEscape: false,
                        closeByDocument: false
                    });
        }
        $scope.closeDialogWindowPhotos = function() {
               console.log("closeDialogWindowPhotos");
               ngDialog.close();
        }
    })
;