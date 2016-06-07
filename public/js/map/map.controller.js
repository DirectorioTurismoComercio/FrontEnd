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
            showFoundPlaces();

            if (siteAndTownSaverService.searchedRoute.origin != undefined && siteAndTownSaverService.getCurrentSearchedSite() == undefined) {
                showSearchedRoute();
            }
        }


        function showSearchedRoute() {
            $scope.loading = true;
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

        $scope.doSearch = function (result) {
            MapService.clearRoute();
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
            sites = [{
                "id": 4,
                "fotos": [{"id": 4, "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/4/4f/Matterhorn_Riffelsee_2005-06-11.jpg", "sitio": 4}],
                "tags": [],
                "nombre": "Biblioteca del Congreso - Sede Luis Carlos Galán Sarmiento",
                "telefono": 0,
                "whatsapp": 0,
                "horariolocal": "",
                "latitud": "4.595276157974567000",
                "longitud": "-74.076391850927850000",
                "descripcion": "La Biblioteca del Congreso de la República de Colombia fue creada por la Ley 69 de 1973. Desde ese año funcionó en el antiguo Convento de Santa Clara, y algunos de sus fondos nunca pudieron ponerse al servicio del público por limitaciones de espacio y de ",
                "correolocal": "",
                "ubicacionlocal": "",
                "usuario": 1,
                "municipio": 1,
                "categorias": []
            }, {
                "id": 7,
                "fotos": [{"id": 7, "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/4/4f/Matterhorn_Riffelsee_2005-06-11.jpg", "sitio": 7}],
                "tags": [],
                "nombre": "Casa Republicana - Manzana Norte - Biblioteca Luis Ángel Arango",
                "telefono": 0,
                "whatsapp": 0,
                "horariolocal": "",
                "latitud": "4.597313428371969000",
                "longitud": "-74.072829877356070000",
                "descripcion": "",
                "correolocal": "",
                "ubicacionlocal": "",
                "usuario": 1,
                "municipio": 1,
                "categorias": []
            }, {
                "id": 55,
                "fotos": [{"id": 55, "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/4/4f/Matterhorn_Riffelsee_2005-06-11.jpg", "sitio": 55}],
                "tags": [],
                "nombre": "Escultura Minerva",
                "telefono": 0,
                "whatsapp": 0,
                "horariolocal": "",
                "latitud": "4.596723903875411000",
                "longitud": "-74.072817807415500000",
                "descripcion": "Escultura en bronce ubicada a la entrada de la biblioteca Luis Ángel Arango. Tal como la representaban los romanos aparece de pie, vestida con túnica, la cabeza protegida por casco, lleva en la mano derecha lanza y escudo y en la izquierda un ramo de oliv",
                "correolocal": "",
                "ubicacionlocal": "",
                "usuario": 1,
                "municipio": 1,
                "categorias": []
            }, {
                "id": 1552,
                "fotos": [{"id": 1552, "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/4/4f/Matterhorn_Riffelsee_2005-06-11.jpg", "sitio": 1552}],
                "tags": [],
                "nombre": "Biblioteca Nacional de Colombia",
                "telefono": 0,
                "whatsapp": 0,
                "horariolocal": "",
                "latitud": "4.609622481409189000",
                "longitud": "-74.068581258276480000",
                "descripcion": "Diseñada por el arquitecto Daniel Bermúdez, la construcción es resultado de la reutilización de una antigua planta de transferencia de basuras que se convirtió en la edificación actual. En esta construcción se destaca el control acústico, el contraste de ",
                "correolocal": "",
                "ubicacionlocal": "",
                "usuario": 1,
                "municipio": 1,
                "categorias": []
            }, {
                "id": 1553,
                "fotos": [{"id": 1553, "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/4/4f/Matterhorn_Riffelsee_2005-06-11.jpg", "sitio": 1553}],
                "tags": [],
                "nombre": "Biblioteca Nacional de Colombia",
                "telefono": 0,
                "whatsapp": 0,
                "horariolocal": "",
                "latitud": "4.609633175541611000",
                "longitud": "-74.068516885260120000",
                "descripcion": "Diseñada por el arquitecto Daniel Bermúdez, la construcción es resultado de la reutilización de una antigua planta de transferencia de basuras que se convirtió en la edificación actual. En esta construcción se destaca el control acústico, el contraste de ",
                "correolocal": "",
                "ubicacionlocal": "",
                "usuario": 1,
                "municipio": 1,
                "categorias": []
            }, {
                "id": 1558,
                "fotos": [{"id": 1558, "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/4/4f/Matterhorn_Riffelsee_2005-06-11.jpg", "sitio": 1558}],
                "tags": [],
                "nombre": "Centro Cultural y Biblioteca Pública Julio Mario Santodomingo",
                "telefono": 0,
                "whatsapp": 0,
                "horariolocal": "",
                "latitud": "4.757624390666912000",
                "longitud": "-74.062680398443720000",
                "descripcion": "",
                "correolocal": "",
                "ubicacionlocal": "",
                "usuario": 1,
                "municipio": 1,
                "categorias": []
            }, {
                "id": 1559,
                "fotos": [{"id": 1559, "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/4/4f/Matterhorn_Riffelsee_2005-06-11.jpg", "sitio": 1559}],
                "tags": [],
                "nombre": "Centro Cultural y Biblioteca Pública Julio Mario Santodomingo",
                "telefono": 0,
                "whatsapp": 0,
                "horariolocal": "",
                "latitud": "4.757218099503095000",
                "longitud": "-74.062658940771600000",
                "descripcion": "",
                "correolocal": "",
                "ubicacionlocal": "",
                "usuario": 1,
                "municipio": 1,
                "categorias": []
            }, {
                "id": 1562,
                "fotos": [{"id": 1562, "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/4/4f/Matterhorn_Riffelsee_2005-06-11.jpg", "sitio": 1562}],
                "tags": [],
                "nombre": "Colección de Instrumentos Musicales. Manzana Norte - Biblioteca Luis Ángel Arango",
                "telefono": 0,
                "whatsapp": 0,
                "horariolocal": "",
                "latitud": "4.597227873826772000",
                "longitud": "-74.072786962011830000",
                "descripcion": "",
                "correolocal": "",
                "ubicacionlocal": "",
                "usuario": 1,
                "municipio": 1,
                "categorias": []
            }, {
                "id": 1704,
                "fotos": [{"id": 1704, "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/4/4f/Matterhorn_Riffelsee_2005-06-11.jpg", "sitio": 1704}],
                "tags": [],
                "nombre": "Seminario Mayor Arquidiocesano",
                "telefono": 0,
                "whatsapp": 0,
                "horariolocal": "",
                "latitud": "4.672693663174863000",
                "longitud": "-74.041002785185360000",
                "descripcion": "Construcción de estilo románico. Su construcción se desarrolla entre 1946 a 1948. Entre las dependencias de este seminario se destaca la biblioteca en la que se encuentran antiguas librerías de los conventos bogotanos, como también libros de derecho y alg",
                "correolocal": "",
                "ubicacionlocal": "",
                "usuario": 1,
                "municipio": 1,
                "categorias": []
            }];
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

        function handleLocationError() {
            messageService.showErrorMessage("No es posible obtener la ubicación");
        }
    })
;