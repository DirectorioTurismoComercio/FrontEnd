'use strict';

angular.module('map')
    .controller('MapController', function ($scope, $window, uiGmapGoogleMapApi, uiGmapIsReady, SearchForResultsFactory,
                                           MapService, ngDialog, SiteMarkerService, $location, messageService, $timeout,
                                           siteAndTownSaverService, MapRouteService, CUNDINAMARCA_COORDS, filterFilter,
                                           requestedMunicipalityDetail, navigationService, MapRouteSitesService) {
            var hasMadeRoute = false;
            var photosPopUp = undefined;
            var requestedMunicipality = requestedMunicipalityDetail.getMunicipality();
            var searchedTown = siteAndTownSaverService.getCurrentSearchedTown();
            $scope.hasMadeFirstRouteToSite = false;
            $scope.routeMapZoom = undefined;
            $scope.selectedSite = null;
            $scope.selectedRoute = undefined;
            $scope.isShowingSiteDetail = false;
            $scope.isOnSitedetails = false;
            $scope.foundSites = [];
            $scope.noResults = false;
            $scope.routeToController = {
                routeFrom: '',
                routeTo: ''
            };
            $scope.resulListInCompactMode = false;
            $scope.routeToSiteIsVisible = false;
            $scope.initialSelectedSite = undefined;
            $scope.hasMadeCurrentSiteRoute = false;
            $scope.isMakingASearchByKeyword = siteAndTownSaverService.getQueryMadeByUser();
            $scope.map = getMapProperties();

            $scope.isShowingRouteList = false;
            $scope.isShowingRouteDetail = false;
            $scope.routePhotos=undefined;

            uiGmapIsReady.promise().then(initMap);

            $scope.navigationToMunicipalityDetail = navigationService.getMunicipalityDetailNavigation()


            function initMap() {
                MapService.setGMap($scope.map.control.getGMap());


                setCundinamarcaPolygon();
                if (siteAndTownSaverService.getCurrentSearchedSite() != undefined) {
                    showFoundPlaces();
                }

                if (siteAndTownSaverService.searchedRoute.origin != undefined && siteAndTownSaverService.getCurrentSearchedSite() == undefined) {
                    showSearchedRoute();
                }

                if (requestedMunicipality) {
                    MapService.clearRoute();
                    addSearchedMunicipalityDetailMarker(requestedMunicipality)
                }
            }

            function getMapProperties() {
                var mapControls = createMapControls(4.6363623, -74.0854427, 9);


                if (requestedMunicipality) {
                    $scope.selectedSite = requestedMunicipality;
                    console.log("selected site", $scope.selectedSite);
                    $scope.isShowingSiteDetail = true;
                    requestedMunicipalityDetail.setMunicipality(undefined);
                    mapControls = createMapControls(requestedMunicipality.latitud, requestedMunicipality.longitud, 14);
                } else if (searchedTown) {
                    mapControls = createMapControls(searchedTown.latitud, searchedTown.longitud, 9);
                }

                return mapControls;
            }

            function createMapControls(latitud, longitud, zoom) {
                return {
                    center: {
                        latitude: parseFloat(latitud),
                        longitude: parseFloat(longitud)
                    },
                    control: {},
                    zoom: zoom
                };
            }


            function reloadMap() {
                $timeout(function () {
                    google.maps.event.trigger($scope.map.control.getGMap(), 'resize');
                });
            }


            function showSearchedRoute() {
                $scope.resulListInCompactMode = true;
                reloadMap();
                SiteMarkerService.deleteMarkers();
                MapRouteService.calculateRoute(siteAndTownSaverService.searchedRoute, $scope, undefined);
                MapService.clearMarkers();
            }

            $scope.showRoute = function () {
                siteAndTownSaverService.setQueryMadeByUser("PLAN_A_ROUTE");
                hasMadeRoute = true;
                siteAndTownSaverService.setCurrentSearchedTown(undefined);
                showSearchedRoute();
            };

            $scope.goBackToSiteList = function () {
                resetFirstSiteSearchedRoute();
                $scope.hideSiteDetail();

                if (siteAndTownSaverService.getQueryMadeByUser() == "SEARCH_BY_KEY_WORD") {
                    searchingByKeyword($scope.result);
                }

                if (siteAndTownSaverService.getQueryMadeByUser() == "PLAN_A_ROUTE") {
                    $scope.showRoute();
                }

                if (!$scope.isShowingRouteList && navigationService.getMunicipalityDetailNavigation() == 'fromHome' && !$scope.isShowingRouteDetail) {
                    $location.path('/home');
                }

                if (!$scope.isShowingRouteList && navigationService.getMunicipalityDetailNavigation() == 'fromMunicipalitiesList' && !$scope.isShowingRouteDetail) {
                    $location.path('/municipalities');
                }

                if ($scope.isShowingRouteList) {
                    centerMapOnBackNavigation(requestedMunicipality);
                    $scope.isShowingRouteList = false;
                    $scope.isShowingSiteDetail = true;
                }

                if($scope.isShowingRouteDetail){
                    MapService.clearMarkers();
                    MapService.clearRoute();
                    if(requestedMunicipality){addSearchedMunicipalityDetailMarker(requestedMunicipality);}
                    centerMapOnBackNavigation(requestedMunicipality);
                    $scope.isShowingRouteDetail=false;
                    $scope.isShowingRouteList=true;
                }

            };


            $scope.hideSiteDetail = function () {
                $scope.routeToSiteIsVisible = false;
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
                var top_anchor = $window.document.getElementById("top_anchor");
                top_anchor.focus();
                top_anchor.blur();

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

                try {
                    if (site.id != $scope.initialSelectedSite.id) {
                        $scope.hasMadeCurrentSiteRoute = false;
                    } else {
                        $scope.hasMadeCurrentSiteRoute = true;
                    }

                } catch (e) {
                    $scope.hasMadeCurrentSiteRoute = false;
                }
            };

            $scope.doSearch = function (result) {
                navigationService.setMunicipalityDetailNavigation(undefined);
                siteAndTownSaverService.setQueryMadeByUser("SEARCH_BY_KEY_WORD");
                searchingByKeyword(result);
            };

            $scope.subcategorySearch = function (subcategoryName) {
                searchingByKeyword(subcategoryName);
            }

            $scope.showRouteToSite = function (site) {
                saveFirstSiteSearchedRoute(site);
                $scope.hasMadeFirstRouteToSite = true;
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

                        MapRouteService.calculateRoute(routeRequest, $scope, site);
                    }, handleLocationError
                );
            };

            $scope.backToInitialPlace = function (initialSelectedSite) {
                $scope.showSiteDetail(initialSelectedSite);
                $scope.showRouteToSite(initialSelectedSite);
            }

            $scope.$on("$routeChangeStart", function (event, next, current) {
                if (photosPopUp != undefined) {
                    event.preventDefault();
                    ngDialog.close();
                    photosPopUp = undefined;
                }

                else if ((next.$$route.controller == 'HomeController' || next.$$route.controller == 'searchMunicipalityController') && ($scope.isShowingSiteDetail || $scope.isShowingRouteDetail || $scope.isShowingRouteList)) {
                    event.preventDefault();
                    $timeout(function () {
                        $scope.goBackToSiteList();
                    },100);
                }

            });

            function centerMapOnBackNavigation(requestedMunicipality){
                if(requestedMunicipality){
                    centerMap(requestedMunicipality,13)
                }else{
                    $timeout(function () {
                        centerMap($scope.selectedSite,13)
                    }, 300);

                }
            }

            function addSearchedMunicipalityDetailMarker(requestedMunicipality){
                MapService.addMarkerMunicipalityWithIcon({
                    lat: parseFloat(requestedMunicipality.latitud),
                    lng: parseFloat(requestedMunicipality.longitud)
                });
            }

            function saveFirstSiteSearchedRoute(site) {
                if (!$scope.hasMadeFirstRouteToSite) {
                    $scope.initialSelectedSite = site;
                }
            }

            function resetFirstSiteSearchedRoute() {
                $scope.hasMadeFirstRouteToSite = false;
                $scope.initialSelectedSite = undefined;
            }

            function searchingByKeyword(keyWord) {
                $scope.resulListInCompactMode = false;
                MapService.clearRoute();
                if (keyWord != undefined) {
                    $scope.hideSiteDetail();
                    centerMapOnSearchedTown();
                    MapService.clearMarkers();
                    drawSitesByKeyWord(keyWord);
                }
                else {
                    messageService.showErrorMessage("ERROR_NO_KEYWORD_SEARCH");
                }
            }

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
                    } else {
                        $scope.foundSites = 0;
                        messageService.showErrorMessage("ERROR_NO_RESULTS");
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
                    MapRouteService.setSiteMarker(sites, $scope);
                }
            }

            function handleLocationError() {
                resetFirstSiteSearchedRoute();
                messageService.showErrorMessage("ERROR_UNAVAILABLE_LOCATION");
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
                $("#mobileResultMap .angular-google-map-container").height('50vh');
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
                    closeByNavigation: true
                });
            }
            $scope.closeDialogWindowPhotos = function () {
                ngDialog.close();
                photosPopUp = undefined;
            }

            $scope.imageClicked = function () {
                event.stopPropagation();
            };

            $scope.isEmpty = function (field) {
                var isEmpty = true;

                if (field) {
                    isEmpty = field.trim().length == 0 || field.trim() == 0;
                }

                return isEmpty;
            };

            $scope.showRouteList = function () {
                $scope.isShowingRouteList = true;
                $scope.isShowingSiteDetail = false;
                if (requestedMunicipality) {
                    $scope.requestedMunicipalityRoutes = requestedMunicipality.rutas;
                } else {
                    $scope.requestedMunicipalityRoutes = $scope.selectedSite.rutas;
                    navigationService.setMunicipalityDetailNavigation()
                }
                console.log("seleccionado", $scope.selectedSite)


                console.log("hizo click en mostrar rutas", requestedMunicipality);
            }

            $scope.showRouteDetail=function(route,index){
                $scope.isShowingRouteList=false;
                $scope.isShowingRouteDetail = true;
                $scope.isShowingSiteDetail=false;
                $scope.selectedRoute = route;
                $scope.routePhotos=ensambleRoutePhotos(route);
                $scope.routeSites=MapRouteSitesService.ensambleRouteSites(route);
                drawRoute();




                console.log("la ruta fue", index);
                console.log("los datos son", route);
            }

            function ensambleRoutePhotos(route){
                var selectedRoutePhotos=[];

                for(var i=0; i<route.sitios.length; i++){
                    selectedRoutePhotos.push(route.sitios[i].sitio.fotos[0]);
                }

                return selectedRoutePhotos;
            }


            function drawRoute(){
                MapService.clearMarkers();
                if ($scope.routeSites.length > 0) {
                    reloadMap();
                    MapRouteSitesService.calculateRoute($scope.routeSites, $scope, undefined);
                }
            }
        }
    )
;