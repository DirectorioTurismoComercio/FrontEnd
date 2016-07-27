'use strict';

angular.module('map')
    .controller('MapController', function ($scope, $window, uiGmapGoogleMapApi, uiGmapIsReady, SearchForResultsFactory,
                                           MapService, ngDialog, SiteMarkerService, $location, messageService, $timeout,
                                           siteAndTownSaverService, MapRouteService, CUNDINAMARCA_COORDS, filterFilter) {
        var userPosition = {};
        var hasMadeRoute = false;
        var photosPopUp = undefined;
        $scope.routeMapZoom = undefined;
        $scope.selectedSite = null;
        $scope.isShowingSiteDetail = false;
        $scope.isOnSitedetails = false;
        $scope.loading = false;
        $scope.foundSites = [];
        $scope.noResults = false;
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
            hasMadeRoute = true;
            siteAndTownSaverService.setCurrentSearchedTown(undefined);
            showSearchedRoute();
        }


        $scope.hideSiteDetail = function () {
            SiteMarkerService.clearSelectedMarker();
            $scope.isShowingSiteDetail = false;
            $scope.isOnSitedetails = false;
            goBackToCenterMap();

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
            $scope.isOnSitedetails = true;
            $scope.selectedSite = site;
            checkSelectedSiteWebPage();
            reloadMap();
            $timeout(function () {
                centerMap(site, 15);
            }, 100);
            //$scope.$apply();
        };

        $scope.doSearch = function (result) {
            $scope.resulListInCompactMode = false;
            MapService.clearRoute();
            if (result != undefined) {
                $scope.hideSiteDetail();
                $scope.loading = true;
                centerMapOnSearchedTown();
                MapService.clearMarkers();
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
        };

        $scope.$on("$routeChangeStart", function (event, next, current) {
            if (photosPopUp != undefined) {
                event.preventDefault();
                ngDialog.close();
                photosPopUp = undefined;
            }

            else if (next.$$route.controller == 'HomeController' && $scope.isShowingSiteDetail) {
                event.preventDefault();
                $scope.hideSiteDetail();
            }

        });

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

        function centerMapOnSearchedTown() {
            var cundinamarca = {
                nombre: 'Cundinamarca',
                latitud: 4.6363623,
                longitud: -74.0854427
            };
            var zoom = 14;

            var selectedTown = siteAndTownSaverService.getCurrentSearchedTown();

            if (selectedTown == undefined || (selectedTown.nombre).indexOf('Cundinamarca') > -1) {
                selectedTown = cundinamarca;
                zoom = 9;
            }

            centerMap(selectedTown, zoom);
        }

        function goBackToCenterMap() {
            if (hasMadeRoute == false) {
                centerMapOnSearchedTown();
            } else {
                centerMap($scope.map.center, $scope.routeMapZoom);
            }
        }


        function centerMap(site, zoom) {
            var position;
            if (site.latitud != undefined) {
                position = MapService.coordsToLatLngLiteral(parseFloat(site.latitud), parseFloat(site.longitud));
            } else {
                position = MapService.coordsToLatLngLiteral(parseFloat(site.latitude), parseFloat(site.longitude));
            }

            MapService.moveMapToPosition(position, zoom);
        }

        function drawSitesByKeyWord(result) {
            SearchForResultsFactory.doSearch(result).then(function (response) {
                SiteMarkerService.deleteMarkers();
                $scope.noResults = response.length == 0;

                if (response.length > 0) {
                    showFoundPlaces();
                    $scope.loading = false;
                } else {
                    $scope.foundSites = 0;
                    messageService.showErrorMessage("No se han encontrado resultados");
                    $scope.loading = false;
                }
            }).catch(function (error) {
                console.log("ocurrio un error", error);
            });
        }

        function showFoundPlaces() {
            hasMadeRoute = false;
            var sites = SearchForResultsFactory.getResults();
            $scope.foundSites = sites;
            centerMapOnSearchedTown();
            if (sites != undefined) {
                for (var i = 0; i < sites.length; i++) {
                    var site = sites[i];
                    var position = MapService.coordsToLatLngLiteral(parseFloat(site.latitud), parseFloat(site.longitud));
                    console.log("el sitio", site);
                    console.log("el filtro", filterFilter(site.categorias,{tipo:1})[0]);
                    var marker = MapService.addMarkerWithCategoryIcon(position, site.nombre, filterFilter(site.categorias,{tipo:1})[0]);
                    site.categoryicon=marker.normalIcon.url;

                    SiteMarkerService.addSiteMarker(site, marker, $scope.showSiteDetail);
                }
            }
        }

        function handleLocationError() {
            messageService.showErrorMessage("No es posible obtener la ubicación");
        }

        function checkSelectedSiteWebPage() {
            var httpProtocol = 'http://';
            var httpsProtocol = 'https://';
            var url = $scope.selectedSite.web;

            if (!url.startsWith(httpProtocol) && !url.startsWith(httpsProtocol) && url) {
                $scope.selectedSite.web = httpProtocol + url;
            }
        }

        $scope.isMobileDevice = function () {
            return $window.innerWidth < 992;
        };

        $scope.showResultListHorizontally = function () {
            return $scope.isMobileDevice() && $scope.resulListInCompactMode;
        };
        $scope.openDialogWindowPhotos = function () {

            photosPopUp = ngDialog.open({
                template: 'js/map/dialogWindowPhotos.html',
                width: 'auto',
                showClose: false,
                scope: $scope,
                closeByEscape: true,
                closeByDocument: true,
                closeByNavigation: true,
            });
        }
        $scope.closeDialogWindowPhotos = function () {
            ngDialog.close();
            photosPopUp = undefined;
        }

        $scope.isEmpty = function (field) {
            var isEmpty = true;

            if (field) {
                isEmpty = field.trim().length == 0 || field.trim() == 0;
            }

            return isEmpty;
        };
    })
;