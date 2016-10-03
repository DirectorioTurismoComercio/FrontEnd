'use strict';

describe('Controller: MapController', function () {
    var MapController, $scope, testpopErrorAlertService, deferred, MapServiceTest, testSearchForResultsFactory, testMapRouteService, testsiteAndTownSaverService, testrequestedMunicipalityDetail, testnavigationService;
    var sitesResponse={
        nombre:'site',
        categorias:[{
            0:3
        }]
    };
    var requestedMunicipality={
        "id": 1926,
        "categorias": [

        ],
        "fotos": [
            {
                "id": 2111,
                "URLfoto": "http://ecosistema.desarrollo.com:8000/Fotos/Fotos/Captura_de_pantalla_2016-09-21_a_las_4.19.03_p.m..jpg",
                "tipo": "P",
                "sitio": 1926,
                "$$hashKey": "object:1550"
            }
        ],
        "rutas": [
            {
                "id": 1,
                "sitios": [
                    {
                        "id": 1,
                        "sitio": {
                            "id": 1926,
                            "categorias": [

                            ],
                            "fotos": [
                                {
                                    "id": 2111,
                                    "URLfoto": "http://ecosistema.desarrollo.com:8000/Fotos/Fotos/Captura_de_pantalla_2016-09-21_a_las_4.19.03_p.m..jpg",
                                    "tipo": "P",
                                    "sitio": 1926
                                }
                            ],
                            "municipio": {
                                "id": 3,
                                "nombre": "Anapoima",
                                "latitud": "4.565941800000000000",
                                "longitud": "-74.564331300000000000"
                            },
                            "tags": [

                            ],
                            "municipio_id": 3,
                            "nombre": "Anapoima",
                            "telefono": "432432432",
                            "whatsapp": "",
                            "horariolocal": "",
                            "web": "",
                            "latitud": "4.550877682666806000",
                            "longitud": "-74.534797221422200000",
                            "descripcion": "descripcion anapoima",
                            "correolocal": "",
                            "ubicacionlocal": "423432",
                            "tipo_sitio": "M",
                            "usuario": 56
                        },
                        "sitio_id": 1926,
                        "orden": 1,
                        "ruta": 1
                    },
                    {
                        "id": 2,
                        "sitio": {
                            "id": 1929,
                            "categorias": [
                                {
                                    "id": 101,
                                    "categoria": {
                                        "id": 2,
                                        "nombre": "Deportes",
                                        "nivel": 1,
                                        "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/deportes.png",
                                        "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/deporte.png",
                                        "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/deporte.png",
                                        "categoria_padre": null
                                    },
                                    "categoria_id": 2,
                                    "tipo": 1,
                                    "sitio": 1929
                                }
                            ],
                            "fotos": [
                                {
                                    "id": 2114,
                                    "URLfoto": "http://ecosistema.desarrollo.com:8000/Fotos/Fotos/Captura_de_pantalla_2016-06-14_a_las_9.58.02_a.m..jpg",
                                    "tipo": "P",
                                    "sitio": 1929
                                }
                            ],
                            "municipio": {
                                "id": 3,
                                "nombre": "Anapoima",
                                "latitud": "4.565941800000000000",
                                "longitud": "-74.564331300000000000"
                            },
                            "tags": [

                            ],
                            "municipio_id": 3,
                            "nombre": "pepe3",
                            "telefono": "423423423",
                            "whatsapp": "",
                            "horariolocal": "",
                            "web": "",
                            "latitud": "4.556987181727967000",
                            "longitud": "-74.530190527439120000",
                            "descripcion": "ddgdf",
                            "correolocal": "",
                            "ubicacionlocal": "432423",
                            "tipo_sitio": "S",
                            "usuario": 56
                        },
                        "sitio_id": 1929,
                        "orden": 2,
                        "ruta": 1
                    },
                    {
                        "id": 3,
                        "sitio": {
                            "id": 1927,
                            "categorias": [
                                {
                                    "id": 99,
                                    "categoria": {
                                        "id": 7,
                                        "nombre": "Comercio",
                                        "nivel": 1,
                                        "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/comercio.png",
                                        "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/comercio.png",
                                        "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/comercio.png",
                                        "categoria_padre": null
                                    },
                                    "categoria_id": 7,
                                    "tipo": 1,
                                    "sitio": 1927
                                }
                            ],
                            "fotos": [
                                {
                                    "id": 2112,
                                    "URLfoto": "http://ecosistema.desarrollo.com:8000/Fotos/Fotos/Goat_Portrait_f4mr1cn.jpg",
                                    "tipo": "P",
                                    "sitio": 1927
                                }
                            ],
                            "municipio": {
                                "id": 3,
                                "nombre": "Anapoima",
                                "latitud": "4.565941800000000000",
                                "longitud": "-74.564331300000000000"
                            },
                            "tags": [

                            ],
                            "municipio_id": 3,
                            "nombre": "sitip pepe",
                            "telefono": "423432423",
                            "whatsapp": "",
                            "horariolocal": "",
                            "web": "",
                            "latitud": "4.550794796327250000",
                            "longitud": "-74.533423930406570000",
                            "descripcion": "423423423",
                            "correolocal": "",
                            "ubicacionlocal": "423432",
                            "tipo_sitio": "S",
                            "usuario": 56
                        },
                        "sitio_id": 1927,
                        "orden": 3,
                        "ruta": 1
                    },
                    {
                        "id": 4,
                        "sitio": {
                            "id": 1928,
                            "categorias": [
                                {
                                    "id": 100,
                                    "categoria": {
                                        "id": 5,
                                        "nombre": "Comida y Bebida",
                                        "nivel": 1,
                                        "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/comida-bebida.png",
                                        "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/comida-bebida.png",
                                        "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/comida-bebida.png",
                                        "categoria_padre": null
                                    },
                                    "categoria_id": 5,
                                    "tipo": 1,
                                    "sitio": 1928
                                }
                            ],
                            "fotos": [
                                {
                                    "id": 2113,
                                    "URLfoto": "http://ecosistema.desarrollo.com:8000/Fotos/Fotos/porta_morada_2_sKxSv9B.jpg",
                                    "tipo": "P",
                                    "sitio": 1928
                                }
                            ],
                            "municipio": {
                                "id": 3,
                                "nombre": "Anapoima",
                                "latitud": "4.565941800000000000",
                                "longitud": "-74.564331300000000000"
                            },
                            "tags": [

                            ],
                            "municipio_id": 3,
                            "nombre": "pepe2",
                            "telefono": "423423423",
                            "whatsapp": "",
                            "horariolocal": "",
                            "web": "",
                            "latitud": "4.547457944797717000",
                            "longitud": "-74.539646655321120000",
                            "descripcion": "sdffsdfsd",
                            "correolocal": "",
                            "ubicacionlocal": "423432",
                            "tipo_sitio": "S",
                            "usuario": 56
                        },
                        "sitio_id": 1928,
                        "orden": 4,
                        "ruta": 1
                    }
                ],
                "nombre": "pepedas",
                "descripcion": "dasdas",
                "tiempo": "11.82 min",
                "distancia": "3.88 Km",
                "sitio": 1926
            }
        ],
        "municipio": {
            "id": 3,
            "nombre": "Anapoima",
            "latitud": "4.565941800000000000",
            "longitud": "-74.564331300000000000"
        },
        "tags": [

        ],
        "municipio_id": 3,
        "nombre": "Anapoima",
        "telefono": "432432432",
        "whatsapp": "",
        "horariolocal": "",
        "web": "",
        "latitud": "4.550877682666806000",
        "longitud": "-74.534797221422200000",
        "descripcion": "descripcion anapoima",
        "correolocal": "",
        "ubicacionlocal": "423432",
        "tipo_sitio": "M",
        "usuario": 56
    };

    beforeEach(module('gemStore', function ($provide, $translateProvider) {

        $provide.factory('customLoader', function ($q) {
            return function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            };
        });

        $translateProvider.useLoader('customLoader');

    }));

    beforeEach(inject(function ($controller, $rootScope, $q, SearchForResultsFactory, MapService, messageService, MapRouteService, siteAndTownSaverService, requestedMunicipalityDetail, navigationService) {
        $scope = $rootScope.$new();
        deferred = $q.defer();
        testpopErrorAlertService = messageService;
        MapServiceTest=MapService;
        testSearchForResultsFactory=SearchForResultsFactory;
        testMapRouteService=MapRouteService;
        testsiteAndTownSaverService=siteAndTownSaverService;
        testrequestedMunicipalityDetail=requestedMunicipalityDetail;
        testnavigationService=navigationService;

        spyOn(SearchForResultsFactory, 'doSearch').and.returnValue(deferred.promise);
        spyOn(testpopErrorAlertService, 'showErrorMessage');
        spyOn(MapServiceTest, 'clearRoute');
        spyOn(MapServiceTest, 'clearMarkers');
        spyOn(MapServiceTest, 'getUserPosition');
        spyOn(MapServiceTest, 'moveMapToPosition');
        spyOn(SearchForResultsFactory,'getResults').and.returnValue(sitesResponse);
        spyOn(testMapRouteService, 'calculateRoute');
        spyOn(requestedMunicipalityDetail,'getMunicipality').and.returnValue(requestedMunicipality);

        MapController = $controller('MapController', {
            $scope: $scope,
            messageService: testpopErrorAlertService,
            MapService: MapServiceTest,
            SearchForResultsFactory:testSearchForResultsFactory,
            MapRouteService:testMapRouteService,
            siteAndTownSaverService:testsiteAndTownSaverService,
            requestedMunicipalityDetail:testrequestedMunicipalityDetail,
            navigationService:testnavigationService
        });
    }));

    it('Should show error message if search has zero results', function () {
        $scope.doSearch();
        deferred.resolve([]);
        $scope.$apply();
        expect(testpopErrorAlertService.showErrorMessage).toHaveBeenCalled();
    });


    it('Should clear routes before making a keyword search', function () {
        $scope.doSearch();
        expect(MapServiceTest.clearRoute).toHaveBeenCalled();
    });

    it('Should show result list if has results', function () {
        $scope.doSearch('place');
        deferred.resolve(['results']);
        $scope.$apply();
        expect($scope.foundSites).not.toBe([]);
    });

    it('Should hide result list if has no results', function () {
        $scope.doSearch('place');
        deferred.resolve([]);
        $scope.$apply();
        expect($scope.foundSites).not.toBe([]);
    });

    it('Should hide sites on the route in site detail if user clicks hideSiteDetail', function () {
        $scope.showRouteToSite('place');
        $scope.hideSiteDetail();
        expect($scope.routeToSiteIsVisible).toBe(false);
    });

    it('Should save the first site that user search its route', function () {
        $scope.showRouteToSite('place');
        $scope.showRouteToSite('place2');
        expect($scope.initialSelectedSite).toBe('place');
    });

    it('Should delete the first site that user search its route when clicks on goBackToSiteList', function () {
        $scope.showRouteToSite('place');
        $scope.goBackToSiteList();
        expect($scope.initialSelectedSite).toBe(undefined);
    });

    it('Should re make search by keyword after user clicks on goBackToSiteList', function () {
        $scope.doSearch('place');
        $scope.goBackToSiteList();
        expect(MapServiceTest.clearMarkers).toHaveBeenCalled();;
    });

    it('Should recognizes when user search by keyword', function () {
        $scope.doSearch('place');
        expect(testsiteAndTownSaverService.getQueryMadeByUser()).toBe("SEARCH_BY_KEY_WORD");
    });

    it('Should recognizes when user plan a route', function () {
        $scope.showRoute();
        expect(testsiteAndTownSaverService.getQueryMadeByUser()).toBe("PLAN_A_ROUTE");
    });

    it('Should re make search by keyword when user makes a search by keyword and then clicks goBackToSiteList', function () {
        $scope.doSearch('place');
        $scope.goBackToSiteList();
        expect(testsiteAndTownSaverService.getQueryMadeByUser()).toBe("SEARCH_BY_KEY_WORD");
        expect(MapServiceTest.clearMarkers).toHaveBeenCalled();
    });

    it('Should re make plan routw when user plan a route and then clicks goBackToSiteList', function () {
        $scope.showRoute();
        $scope.goBackToSiteList();
        expect(testsiteAndTownSaverService.getQueryMadeByUser()).toBe("PLAN_A_ROUTE");
        expect(MapServiceTest.clearMarkers).toHaveBeenCalled();
    });

    /* Jasmine can't search for function startsWith because it's from ECMAScript 6 too new */
    xit('Should show initial place detail if user clicks on backToInitialPlace button', function () {
        $scope.doSearch('place');
        $scope.initialSelectedSite={
            "id": 1921,
            "categorias": [
                {
                    "id": 103,
                    "categoria": {
                        "id": 2,
                        "nombre": "Deportes",
                        "nivel": 1,
                        "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/deportes.png",
                        "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/deporte.png",
                        "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/deporte.png",
                        "categoria_padre": null
                    },
                    "categoria_id": 2,
                    "tipo": 0,
                    "sitio": 1921
                },
                {
                    "id": 102,
                    "categoria": {
                        "id": 2,
                        "nombre": "Deportes",
                        "nivel": 1,
                        "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/deportes.png",
                        "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/deporte.png",
                        "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/deporte.png",
                        "categoria_padre": null
                    },
                    "categoria_id": 2,
                    "tipo": 0,
                    "sitio": 1921
                },
                {
                    "id": 101,
                    "categoria": {
                        "id": 2,
                        "nombre": "Deportes",
                        "nivel": 1,
                        "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/deportes.png",
                        "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/deporte.png",
                        "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/deporte.png",
                        "categoria_padre": null
                    },
                    "categoria_id": 2,
                    "tipo": 0,
                    "sitio": 1921
                },
                {
                    "id": 100,
                    "categoria": {
                        "id": 2,
                        "nombre": "Deportes",
                        "nivel": 1,
                        "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/deportes.png",
                        "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/deporte.png",
                        "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/deporte.png",
                        "categoria_padre": null
                    },
                    "categoria_id": 2,
                    "tipo": 0,
                    "sitio": 1921
                },
                {
                    "id": 99,
                    "categoria": {
                        "id": 2,
                        "nombre": "Deportes",
                        "nivel": 1,
                        "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/deportes.png",
                        "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/deporte.png",
                        "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/deporte.png",
                        "categoria_padre": null
                    },
                    "categoria_id": 2,
                    "tipo": 1,
                    "sitio": 1921
                },
                {
                    "id": 104,
                    "categoria": {
                        "id": 25,
                        "nombre": "Rapel",
                        "nivel": 2,
                        "URL_icono_general": null,
                        "URL_icono_normal": null,
                        "URL_icono_seleccionado": null,
                        "categoria_padre": 2
                    },
                    "categoria_id": 25,
                    "tipo": 0,
                    "sitio": 1921
                }
            ],
            "fotos": [
                {
                    "id": 2173,
                    "URLfoto": "http://ecosistema.desarrollo.com:8000/Fotos/Fotos/blob_kw5sznr",
                    "tipo": "P",
                    "sitio": 1921,
                    "$$hashKey": "object:1530"
                }
            ],
            "municipio": {
                "id": 3,
                "nombre": "Anapoima",
                "latitud": "4.565941800000000000",
                "longitud": "-74.564331300000000000"
            },
            "tags": [

            ],
            "municipio_id": 3,
            "nombre": "pepe 2",
            "telefono": "423432233",
            "whatsapp": "",
            "horariolocal": "",
            "web": "www.place.com",
            "latitud": "4.545901811635493000",
            "longitud": "-74.535482525825500000",
            "descripcion": "423423",
            "correolocal": "",
            "ubicacionlocal": "423432",
            "usuario": 40,
            "categoryicon": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/deportes.png"
        }
        $scope.backToInitialPlace($scope.initialSelectedSite);
        expect($scope.showSiteDetail($scope.initialSelectedSite)).toHaveBeenCalled();;
    });

    it('Should show showRouteToSite button when user sees site detail for first time', function () {
        $scope.doSearch('place');
        expect($scope.hasMadeCurrentSiteRoute).toBe(false);
    });

    it('Should show routes and hide isShowingSiteDetail if user clicks Show municipalityRoutes', function(){
        $scope.showRouteList();
        expect($scope.isShowingRouteList).toBe(true);
        expect($scope.isShowingSiteDetail).toBe(false);
    });

    it('Should show municipality detail if user is on municipality reoutes list and clicks go back', function(){
        $scope.showRouteList();
        $scope.goBackToSiteList();
        expect($scope.isShowingRouteList).toBe(false);
        expect($scope.isShowingSiteDetail).toBe(true);
    });

    it('Should show route detail, hide routeList, and siteDetail when user clicks showRouteDetail', function(){
        $scope.showRouteDetail(requestedMunicipality.rutas[0]);
        expect($scope.isShowingRouteList).toBe(false);
        expect($scope.isShowingRouteDetail).toBe(true);
        expect($scope.isShowingSiteDetail).toBe(false);

    });

});
