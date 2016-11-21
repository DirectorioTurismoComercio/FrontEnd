'use strict';

angular.module('map')
    .controller('MapController', function ($scope, $window, uiGmapGoogleMapApi, uiGmapIsReady, SearchForResultsFactory,
                                           MapService, ngDialog, SiteMarkerService, $location, messageService, $timeout,
                                           siteAndTownSaverService, MapRouteService, CUNDINAMARCA_COORDS, filterFilter,
                                           requestedMunicipalityDetail, $http, API_CONFIG, navigationService, MapRouteSitesService, $translate, $rootScope) {
            var hasMadeRoute = false;
            var photosPopUp = undefined;
            var requestedMunicipality = requestedMunicipalityDetail.getMunicipality();
            var searchedTown = siteAndTownSaverService.getCurrentSearchedTown();
            var searchedMunicipality = requestedMunicipality;
            var currentPage = 0;
            $scope.hasReachedLastPage = false;
            $scope.hasShowRouteToSiteToMunicipality = undefined;
            $scope.hasMadeFirstRouteToSite = false;
            $scope.routeMapZoom = undefined;
            $scope.selectedSite = null;
            $scope.selectedRoute = undefined;
            $scope.isShowingSiteDetail = false;
            $scope.isOnSitedetails = false;
            $scope.foundSites = [];
            $scope.noResults = false;
            $scope.loader = false;
            $scope.routeToController = {
                routeFrom: '',
                routeTo: ''
            };
            $scope.resulListInCompactMode = false;
            $scope.routeToSiteIsVisible = false;
            $scope.initialSelectedSite = undefined;
            $scope.hasMadeCurrentSiteRoute = false;
            $scope.map = getMapProperties();

            $scope.isShowingRouteList = false;
            $scope.isShowingRouteDetail = false;
            $scope.hasSelectedMunicipalityRoutes = false;
            $scope.isDrawingRouteToRegisterSite = false;
            $scope.languageSelected = $translate.use()

            $scope.points=undefined;

            $scope.busy = false;

            $scope.scrollContainer=$window.innerWidth < 992 ? "" : "#resultList";

            uiGmapIsReady.promise().then(initMap);

            $scope.navigationToMunicipalityDetail = navigationService.getMunicipalityDetailNavigation();
            $scope.carouselIndex2=0;


            $scope.nextPage = function () {
                if ($scope.busy || currentPage == 0 || $scope.hasReachedLastPage || $scope.isDrawingRouteToRegisterSite) {
                    return;
                } else {
                    $scope.busy = true;
                    if(!($scope.isMobileDevice() && ($scope.resulListInCompactMode || $scope.isOnSitedetails || $scope.isShowingRouteDetail) && !$scope.isShowingRouteList)) {
                        getNextResults();
                    }
                    $scope.busy = false;

                }
            }

        $scope.nextPageSitesNearSelectedSite = function () {
            if($scope.busy || currentPage == 0 || $scope.hasReachedLastPage){
                return;
            }else{
                $scope.busy = true;
                sitesNearRouteGetNextResults();
                $scope.busy = false;

            }
        }


            function getNextResults() {
                if (!$scope.isDrawingRouteToRegisterSite && !hasMadeRoute && siteAndTownSaverService.getQueryMadeByUser() != "PLAN_A_ROUTE") {
                        searchByKeyWordGetNextResults();
                }else{
                        sitesNearRouteGetNextResults();
                }
                $scope.busy = false;
            }

            function searchByKeyWordGetNextResults() {
                currentPage = currentPage + 1;
                $http.get(API_CONFIG.url + '/buscar/?search=' + getKeyWord() + '&page=' + currentPage)
                    .success(function (response) {
                        drawMarkers(response);
                    });
            }

            function sitesNearRouteGetNextResults(){
                if($scope.points){
                    currentPage = currentPage + 1;
                    $http.post(API_CONFIG.url+API_CONFIG.sitios, {'points': $scope.points,
                            'page':currentPage})
                        .success(function(sites){
                            drawMarkers(sites);
                            $scope.loading = false;
                        })
                }
            }

            function drawMarkers(response){
                $scope.hasReachedLastPage = response.length == 0;
                for (var i = 0; i < response.length; i++) {
                    $scope.foundSites.push(response[i]);
                }
                MapRouteService.setSiteMarker(response, $scope);
            }

            function resetPaginationVariables(){
                currentPage = 1;
                $scope.hasReachedLastPage=false;
            }

            function initMap() {
                MapService.setGMap($scope.map.control.getGMap());


                setCundinamarcaPolygon();
                if (siteAndTownSaverService.getCurrentSearchedSite() != undefined) {
                    resetPaginationVariables();
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
                resetPaginationVariables();
                $scope.resulListInCompactMode = true;
                reloadMap();
                SiteMarkerService.deleteMarkers();
                $scope.isDrawingRouteToRegisterSite = false;
                MapRouteService.calculateRoute(siteAndTownSaverService.searchedRoute, $scope, undefined);
                MapService.clearMarkers();
            }

            $scope.showRoute = function () {
                resetPaginationVariables();
                siteAndTownSaverService.setQueryMadeByUser("PLAN_A_ROUTE");
                hasMadeRoute = true;
                siteAndTownSaverService.setCurrentSearchedTown(undefined);
                showSearchedRoute();
            };

            $scope.goBack = function () {
                if (!$scope.hasSelectedMunicipalityRoutes && !$scope.hasShowRouteToSiteToMunicipality) {
                    resetRouteAndDetailsValues();
                }

                if (!$scope.hasSelectedMunicipalityRoutes && siteAndTownSaverService.getQueryMadeByUser() == "SEARCH_BY_KEY_WORD") {
                    resetRouteAndDetailsValues();
                    var keyWord = getKeyWord();
                    searchingByKeyword(keyWord);
                }

                if (!$scope.hasSelectedMunicipalityRoutes && siteAndTownSaverService.getQueryMadeByUser() == "PLAN_A_ROUTE" && !$scope.isShowingRouteList && !$scope.isShowingRouteDetail) {
                    $scope.isOnSitedetails = false;
                    $scope.isShowingRouteDetail = false;
                    $scope.isShowingRouteList = false;
                    $scope.isShowingSiteDetail = false;
                    $scope.$broadcast('resetSlideIndex',0);
                    $scope.showRoute();
                }

                if (!$scope.isShowingRouteList && navigationService.getMunicipalityDetailNavigation() == 'fromHome' && !$scope.isShowingRouteDetail && !$scope.hasSelectedMunicipalityRoutes && $scope.selectedSite.tipo_sitio == 'M') {
                    resetValuesBeforeChangeView();
                    $location.path('/home');
                }

                if (!$scope.isShowingRouteList && navigationService.getMunicipalityDetailNavigation() == 'fromMunicipalitiesList' && !$scope.isShowingRouteDetail && !$scope.hasSelectedMunicipalityRoutes && $scope.selectedSite.tipo_sitio == 'M') {
                    resetValuesBeforeChangeView();
                    $location.path('/municipalities');
                }

                if ($scope.isShowingRouteList && !$scope.hasMadeFirstRouteToSite) {
                    centerMapOnBackNavigation(searchedMunicipality);
                    hideRouteListShowSiteDetail();
                }

                if ($scope.isShowingRouteList && $scope.hasMadeFirstRouteToSite) {
                    $scope.showRouteToSite(searchedMunicipality);
                    hideRouteListShowSiteDetail();
                }

                if ($scope.isShowingRouteDetail) {
                    MapService.clearMarkers();
                    MapService.clearRoute();
                    SiteMarkerService.deleteMarkers();
                    addSearchedMunicipalityDetailMarker(searchedMunicipality);

                    centerMapOnBackNavigation(searchedMunicipality);
                    $scope.isShowingRouteDetail = false;
                    $scope.isShowingRouteList = true;
                }

                if ($scope.hasSelectedMunicipalityRoutes && $scope.isShowingSiteDetail) {
                    $scope.isShowingSiteDetail = false;
                    $scope.isShowingRouteDetail = true;
                    SiteMarkerService.deleteMarkers();

                    $scope.selectedSite = searchedMunicipality;


                    $timeout(function () {
                        drawRoute();
                    }, 200);
                }

                if ($scope.hasShowRouteToSiteToMunicipality && $scope.isShowingSiteDetail && $scope.selectedSite.tipo_sitio != 'M') {
                    $scope.hasShowRouteToSiteToMunicipality = false;
                    $scope.showSiteDetail(searchedMunicipality, 0);
                    $scope.showRouteToSite(searchedMunicipality);

                }

            };

            function getKeyWord() {
                var keyWord = undefined;

                try {
                    for (var i = 0; i < $scope.subcategories.length; i++) {
                        if ($scope.subcategories[i].isSelected) {
                            keyWord = $scope.subcategories[i].nombre;
                        }
                    }
                } catch (e) {
                }

                if (keyWord == undefined) {
                    keyWord = $scope.result;
                }

                return keyWord;
            }

            function resetValuesBeforeChangeView() {
                $scope.selectedSite = undefined;
                $scope.isShowingSiteDetail = false;
                $scope.isShowingRouteList = false;
                $scope.isShowingRouteDetail = false;
            }

            function hideRouteListShowSiteDetail() {
                $scope.hasSelectedMunicipalityRoutes = false;
                $scope.isShowingRouteList = false;
                $scope.isShowingSiteDetail = true;
            }


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

            $scope.highLightMarker = function (index, isDrawingRouteToRegisterSite) {
                SiteMarkerService.highLightMarkerByIndex(index, isDrawingRouteToRegisterSite);
            };

            $scope.showSiteDetail = function (site, index) {
                $scope.isShowingRouteList = false;
                $scope.isShowingRouteDetail = false;
                sendViewToTop();


                if (index) {
                    SiteMarkerService.highLightMarkerByIndex(index);
                }
                $scope.isShowingSiteDetail = true;
                $scope.isOnSitedetails = true;
                $scope.selectedSite = site;
                if ($scope.selectedSite.tipo_sitio == 'M') {
                    searchedMunicipality = site;
                }
                checkSelectedSiteWebPage();
                reloadMap();
                $timeout(function () {
                    var zoom = $scope.hasSelectedMunicipalityRoutes ? 18 : 15;
                    centerMap(site, zoom);
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
                $scope.loader = true;
                $scope.foundSites = [];
                navigationService.setMunicipalityDetailNavigation(undefined);
                siteAndTownSaverService.setQueryMadeByUser("SEARCH_BY_KEY_WORD");
                searchingByKeyword(result);
            };

            $scope.subcategorySearch = function (subcategoryName) {
                searchingByKeyword(subcategoryName);
            }

            $scope.showRouteToSite = function (site) {
                resetPaginationVariables();
                if ($scope.selectedSite.tipo_sitio == 'M') {
                    $scope.hasShowRouteToSiteToMunicipality = true;
                }
                saveFirstSiteSearchedRoute(site);
                $scope.initialSelectedSite = site;
                $scope.hasMadeFirstRouteToSite = true;
                $scope.resulListInCompactMode = true;
                $scope.isDrawingRouteToRegisterSite = true;
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
                if (photosPopUp != undefined && !navigationService.hasClickedLogoButton()) {
                    event.preventDefault();
                    ngDialog.close();
                    photosPopUp = undefined;
                }

                else if ((next.$$route.controller == 'HomeController' || next.$$route.controller == 'searchMunicipalityController') && ($scope.isShowingSiteDetail || $scope.isShowingRouteDetail || $scope.isShowingRouteList) && !navigationService.hasClickedLogoButton()) {
                    event.preventDefault();
                    $timeout(function () {
                        $scope.goBack();
                    }, 100);
                }

            });

            function sendViewToTop() {
                var top_anchor = $window.document.getElementById("top_anchor")
                top_anchor.focus();
                top_anchor.blur();

                var resultListDiv = $window.document.getElementById("resultList");
                resultListDiv.scrollTop = 0;
            }

            function resetRouteAndDetailsValues() {
                resetFirstSiteSearchedRoute();
                $scope.hideSiteDetail();
            }

            function centerMapOnBackNavigation(requestedMunicipality) {
                if (requestedMunicipality) {
                    centerMap(requestedMunicipality, 13)
                } else {
                    $timeout(function () {
                        centerMap($scope.selectedSite, 13)
                    }, 300);

                }
            }

            function addSearchedMunicipalityDetailMarker(requestedMunicipality) {
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
                $scope.isDrawingRouteToRegisterSite = false;
                resetPaginationVariables();
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
                    $scope.loader = false;

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
                        $scope.loader = false;

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
                $scope.hasSelectedMunicipalityRoutes = true;
                $scope.isShowingRouteList = true;
                $scope.isShowingSiteDetail = false;
                $scope.requestedMunicipalityRoutes = $scope.selectedSite.rutas;
            }

            $scope.showRouteDetail = function (route, index) {
                $scope.foundSites = undefined;
                sendViewToTop();
                $scope.isShowingRouteList = false;
                $scope.isShowingRouteDetail = true;
                $scope.isShowingSiteDetail = false;
                $scope.selectedRoute = route;
                $scope.routeSites = MapRouteSitesService.ensambleRouteSites(route);
                drawRoute();
            }

            function drawRoute() {
                MapService.clearMarkers();
                MapService.clearRoute();
                if ($scope.routeSites.length > 0) {
                    reloadMap();
                    MapRouteSitesService.calculateRoute($scope.routeSites, $scope, undefined);
                }
            }

            $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
                $timeout(function () {
                    $scope.loader = false;
                }, 1000);

            });


            $rootScope.$on('$translateChangeSuccess', function () {
                $scope.languageSelected = $translate.use();

            });

            $scope.getSiteDescription = function (site) {
                if ($scope.languageSelected == 'en') {
                    return site.description;
                }
                if ($scope.languageSelected == 'es') {
                    return site.descripcion;
                }

            }

            $scope.getSiteOpenningHours = function (site) {
                if ($scope.languageSelected == 'en') {
                    return site.businessOpenningHours;
                }
                if ($scope.languageSelected == 'es') {
                    return site.horariolocal;
                }
            }

        }
    );


