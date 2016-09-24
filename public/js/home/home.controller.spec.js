'use strict';

describe('Controller: HomeController', function () {
    var homeController, test$translate, $scope, deferred, location, testsiteAndTownSaverService, testmessageService, MapServiceTest, testWindow, testMunicipalitiesDAO;

    beforeEach(module('gemStore'));
    beforeEach(module('home'));


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


    beforeEach(inject(function ($controller,$httpBackend, $rootScope, $q, SearchForResultsFactory, $location, siteAndTownSaverService, messageService, MapService, $window, $translate, MunicipalitiesDAO) {
        $scope = $rootScope.$new();
        deferred = $q.defer();
        location = $location;
        testsiteAndTownSaverService=siteAndTownSaverService;
        testmessageService=messageService;
        MapServiceTest=MapService;
        testWindow=$window;
        test$translate=$translate;
        testMunicipalitiesDAO=MunicipalitiesDAO;


        spyOn(SearchForResultsFactory, 'doSearch').and.returnValue(deferred.promise);
        spyOn(testmessageService, 'showErrorMessage');
        spyOn(location, 'path');
        spyOn(testsiteAndTownSaverService, 'setCurrentSearchedSite');
        spyOn(testsiteAndTownSaverService, 'resetSearchAndRoute');
        spyOn(MapServiceTest,'clearRoute');
        spyOn(testWindow,'innerWidth').and.returnValue(1000);
        spyOn(test$translate,'use').and.returnValue('es');


        $httpBackend.when('GET','http://innovamarca.com.co:8000/sitio/municipios').respond([
            {
                "id": 3000,
                "categorias": [],
                "fotos": [
                    {
                        "id": 3002,
                        "URLfoto": "http://ecosistema.desarrollo.com:8000/Fotos/Fotos/Catedraldefaca.jpg",
                        "tipo": "P",
                        "sitio": 3000
                    }
                ],
                "municipio": {
                    "id": 26,
                    "nombre": "FacatativÃ¡",
                    "latitud": "4.813611111111110000",
                    "longitud": "-74.354444444444400000"
                },
                "tags": [],
                "municipio_id": 26,
                "nombre": "FacatativÃ¡",
                "telefono": "2708842",
                "whatsapp": "",
                "horariolocal": "",
                "web": "",
                "latitud": "4.802013413359239000",
                "longitud": "-74.339445233345030000",
                "descripcion": "FacatativÃ¡, tambiÃ©n conocido como Faca, es uno de los 116 municipios del departamento de Cundinamarca, centro de Colombia. Su nombre proviene del muisca, y tiene significados diferentes; sin embargo, Â«cercado fuerte al final de la llanuraÂ» es el mÃ¡s conocido y aceptado.",
                "correolocal": "",
                "ubicacionlocal": "Cra 24 # 15-16",
                "tipo_sitio": "M",
                "usuario": 3000
            },
            {
                "id": 3003,
                "categorias": [],
                "fotos": [
                    {
                        "id": 3003,
                        "URLfoto": "http://ecosistema.desarrollo.com:8000/Fotos/Fotos/1280px-Paque_Nemoc%C3%83%C2%B3n_Cundinamarca.jpg",
                        "tipo": "P",
                        "sitio": 3003
                    }
                ],
                "municipio": {
                    "id": 60,
                    "nombre": "NemocÃ³n",
                    "latitud": "5.050000000000000000",
                    "longitud": "-73.883333333333300000"
                },
                "tags": [],
                "municipio_id": 60,
                "nombre": "NemocÃ³n",
                "telefono": "2708842",
                "whatsapp": "",
                "horariolocal": "",
                "web": "",
                "latitud": "5.060604453534960000",
                "longitud": "-73.878019452095030000",
                "descripcion": "NemocÃ³n es un municipio de Cundinamarca (Colombia), ubicado en la provincia de Sabana Centro, se encuentra a 45 km de BogotÃ¡. NemocÃ³n significa, en idioma muisca, \"Lamento o Rugido del Guerrero\". Los primitivos pobladores eran los nemzas, de la naciÃ³n muisca. Desde tiempo inmemorial, los indÃ­genas explotaban las minas de sal. El 9 de julio de 1593 llegÃ³ de visita el oidor Miguel de Ibarra. El 11 de agosto, Francisco de Rivero hizo descripciÃ³n de los indios, de la que resultaron 302. El 26 de julio de 1600 llegÃ³ de visita el Pedro Gonzales Rioja y profiriÃ³ auto de esta fecha y junto con los indios de Tasgata fundÃ³ el pueblo. MÃ¡s tarde, los de Tasgara fueron agregados a Tausa por JoaquÃ­n de ArÃ³stequi.",
                "correolocal": "",
                "ubicacionlocal": "Cra 24 # 15-16",
                "tipo_sitio": "M",
                "usuario": 3000
            },
            {
                "id": 3002,
                "categorias": [],
                "fotos": [
                    {
                        "id": 3001,
                        "URLfoto": "http://ecosistema.desarrollo.com:8000/Fotos/Fotos/blob.jpg",
                        "tipo": "P",
                        "sitio": 3002
                    }
                ],
                "municipio": {
                    "id": 88,
                    "nombre": "Suesca",
                    "latitud": "5.103939700000000000",
                    "longitud": "-73.803009300000000000"
                },
                "tags": [],
                "municipio_id": 88,
                "nombre": "Suesca",
                "telefono": "2708842",
                "whatsapp": "",
                "horariolocal": "",
                "web": "",
                "latitud": "4.802013413359239000",
                "longitud": "-74.339445233345030000",
                "descripcion": "Suesca es un municipio de Cundinamarca, en el centro de (Colombia), ubicado en la provincia de Almeidas. La palabra Suesca se deriva del vocablo muisca \"Suehica\", que significa \"Roca de las Aves\".",
                "correolocal": "",
                "ubicacionlocal": "Cra 24 # 15-16",
                "tipo_sitio": "M",
                "usuario": 3000
            },
            {
                "id": 3001,
                "categorias": [],
                "fotos": [
                    {
                        "id": 3000,
                        "URLfoto": "http://ecosistema.desarrollo.com:8000/Fotos/Fotos/blob.jpg",
                        "tipo": "P",
                        "sitio": 3001
                    }
                ],
                "municipio": {
                    "id": 116,
                    "nombre": "ZipaquirÃ¡",
                    "latitud": "5.021497200000000000",
                    "longitud": "-73.997903200000000000"
                },
                "tags": [],
                "municipio_id": 116,
                "nombre": "ZipaquirÃ¡",
                "telefono": "2708842",
                "whatsapp": "",
                "horariolocal": "",
                "web": "",
                "latitud": "5.014092899650111000",
                "longitud": "-73.990972638130190000",
                "descripcion": "ZipaquirÃ¡ es un municipio colombiano localizado en la provincia de Sabana Centro, de la que es su capital, sede de su diÃ³cesis y su ciudad mÃ¡s importante.ComÃºnmente llamado Zipa en referencia al Zipa; tÃ­tulo que ostentaba el cacique muisca del Cacicazgo de BacatÃ¡. Es uno de los centros de explotaciÃ³n de sal mÃ¡s importantes en Colombia, razÃ³n por la cual se le llama la \"Ciudad de la Sal\" y \"el congelador de Cundinamarca\" debido a su clima frÃ­o con niebla en las maÃ±anas. ",
                "correolocal": "",
                "ubicacionlocal": "Cra 24 # 15-16",
                "tipo_sitio": "M",
                "usuario": 3000
            }
        ]);

        homeController = $controller('HomeController', {
            $scope: $scope,
            SearchForResultsFactory: SearchForResultsFactory,
            $location: location,
            siteAndTownSaverService:testsiteAndTownSaverService,
            popErrorAlertService:messageService,
            $translate:test$translate,
            MunicipalitiesDAO:testMunicipalitiesDAO
        });
    }));


    it('Should reset searched sites or routes variables on load home', function () {
        expect(testsiteAndTownSaverService.resetSearchAndRoute).toHaveBeenCalled();
    });

    it('Should redirects to How it Works Page', function () {
        $scope.goToHowItWorks();
        expect(location.path).toHaveBeenCalled();
    });

    it('Should show error message if search input has no keyword', function () {
        $scope.doSearch();
        deferred.resolve([]);
        $scope.$apply();
        expect(testmessageService.showErrorMessage).toHaveBeenCalled();
    });

    it('Should show error message if search has zero results', function () {
        $scope.doSearch('casa');
        deferred.resolve([]);
        $scope.$apply();
        expect(testmessageService.showErrorMessage).toHaveBeenCalled();
    });

    it('Should show catch error if has no response', function () {
        $scope.doSearch('casa');
        deferred.reject();
        $scope.$apply();
        expect(testmessageService.showErrorMessage).toHaveBeenCalled();
    });

    it('Should clear routes before making a keyword search', function () {
        $scope.doSearch('keyword');
        expect(MapServiceTest.clearRoute).toHaveBeenCalled();
    });


    it('Should redirects to map page', function () {
        $scope.doSearch('bar');
        deferred.resolve(['Repuesta']);
        $scope.$apply();
        expect(location.path).toHaveBeenCalled();
    });

    it('Should save the current searched site', function () {
        $scope.doSearch('bar');
        deferred.resolve(['Repuesta']);
        $scope.$apply();
        expect(testsiteAndTownSaverService.setCurrentSearchedSite).toHaveBeenCalled();
    });

    it('Should show error if user does not type any place in the input box', function () {
        $scope.doSearch();
        deferred.resolve(['Repuesta']);
        $scope.$apply();
        expect(testmessageService.showErrorMessage).toHaveBeenCalled();
    });

    it('Should go to map to show the route', function () {
        $scope.showRoute();
        expect(location.path).toHaveBeenCalled();
    });

    it('Should set desktop image of how it works if is in desktop', function () {
        expect($scope.howItWorksImage).toBe('como-funciona-comerciante-home-esp.jpg');
    });

    it('Should redirect to register trader on click button register', function () {
        $scope.goToHowItWorksTrader();
        expect(location.path).toHaveBeenCalled();
    });

});