'use strict';

describe('Controller: dropDownTownsController', function () {
    var dropDownTownsController, $scope, deferred, testsiteAndTownSaverService, testtranslate;
    var response=[
        {
            "id": 1,
            "nombre": "Bogotá",
            "latitud": "4.667715085742610000",
            "longitud": "-74.054495454505900000"
        },
        {
            "id": 2,
            "nombre": "Boita",
            "latitud": "4.668280000000000000",
            "longitud": "-74.055457000000000000"
        }
    ];
    beforeEach(module('gemStore'));
    beforeEach(module('dropDownTowns'));

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

    beforeEach(inject(function ($controller, $rootScope, $q,siteAndTownSaverService, MunicipiosFactory, $translate) {
        $scope = $rootScope.$new();
        deferred = $q.defer();
        testsiteAndTownSaverService=siteAndTownSaverService;
        testtranslate=$translate;

        spyOn(MunicipiosFactory, 'getTowns').and.returnValue(deferred.promise);

        spyOn(testsiteAndTownSaverService, 'setCurrentSearchedTown');

        dropDownTownsController = $controller('dropDownTownsController', {
            $scope: $scope,
            MunicipiosFactory:MunicipiosFactory,
            siteAndTownSaverService:testsiteAndTownSaverService,
            $translate:testtranslate
        });
    }));

    it('should set Todo Cundinamarca in first place if page is in spanish language', function(){
        spyOn(testtranslate, 'use').and.returnValue('es');
        $scope.isonregistersite=false;
        deferred.resolve(response);
        $scope.$apply();
        $scope.municipios=response;
        expect($scope.municipios[0].nombre).toBe('Todo Cundinamarca');
    });

    it('should set All Cundinamarca in first place if page is in english language', function(){
        spyOn(testtranslate, 'use').and.returnValue('en');
        $scope.isonregistersite=false;
        deferred.resolve(response);
        $scope.$apply();
        $scope.municipios=response;
        expect($scope.municipios[0].nombre).toBe('All Cundinamarca');
    });

    it('Should set current searched town', function () {
        deferred.resolve([
            {
                "nombre": "Todo Cundinamarca"
            },
            {
                "id": 1,
                "nombre": "Bogotá",
                "latitud": "4.667715085742610000",
                "longitud": "-74.054495454505900000"
            },
            {
                "id": 2,
                "nombre": "Boita",
                "latitud": "4.668280000000000000",
                "longitud": "-74.055457000000000000"
            }
        ]);
        $scope.$apply();
        $scope.selectTown(0);
        expect(testsiteAndTownSaverService.setCurrentSearchedTown).toHaveBeenCalled();
    });

    it('Should set default name: Todo Cundinamarca', function () {
        deferred.resolve(['Bogota']);
        $scope.$apply();
        testsiteAndTownSaverService.getCurrentSearchedTown(null);
        expect($scope.selectedTown).toBe('Todo Cundinamarca');
    });
});
