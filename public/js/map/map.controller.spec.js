'use strict';

describe('Controller: MapController', function () {
    var MapController, $scope, testpopErrorAlertService, deferred, MapServiceTest, testSearchForResultsFactory, testMapRouteService;
    var sitesResponse={
        nombre:'site',
        categorias:[{
            0:3
        }]
    };
    beforeEach(module('gemStore'));

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

    beforeEach(inject(function ($controller, $rootScope, $q, SearchForResultsFactory, MapService, messageService, MapRouteService) {
        $scope = $rootScope.$new();
        deferred = $q.defer();
        testpopErrorAlertService = messageService;
        MapServiceTest=MapService;
        testSearchForResultsFactory=SearchForResultsFactory;
        testMapRouteService=MapRouteService;

        spyOn(SearchForResultsFactory, 'doSearch').and.returnValue(deferred.promise);
        spyOn(testpopErrorAlertService, 'showErrorMessage');
        spyOn(MapServiceTest, 'clearRoute');
        spyOn(MapServiceTest, 'clearMarkers');
        spyOn(MapServiceTest, 'getUserPosition');
        spyOn(MapServiceTest, 'moveMapToPosition');
        spyOn(SearchForResultsFactory,'getResults').and.returnValue(sitesResponse);
        spyOn(testMapRouteService, 'calculateRoute');

        MapController = $controller('MapController', {
            $scope: $scope,
            messageService: testpopErrorAlertService,
            MapService: MapServiceTest,
            SearchForResultsFactory:testSearchForResultsFactory,
            MapRouteService:testMapRouteService
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
        expect( $scope.isMakingASearchByKeyword).toBe(true);
    });

    it('Should recognizes when user plan a route', function () {
        $scope.showRoute();
        expect( $scope.isMakingASearchByKeyword).toBe(false);
    });

    it('Should re make search by keyword when user makes a search by keyword and then clicks goBackToSiteList', function () {
        $scope.doSearch('place');
        $scope.goBackToSiteList();
        expect( $scope.isMakingASearchByKeyword).toBe(true);
        expect(MapServiceTest.clearMarkers).toHaveBeenCalled();
    });

    it('Should re make plan routw when user plan a route and then clicks goBackToSiteList', function () {
        $scope.showRoute();
        $scope.goBackToSiteList();
        expect( $scope.isMakingASearchByKeyword).toBe(false);
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

});
