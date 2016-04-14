'use strict';

describe('Controller: dropDownTownsController', function () {
    var dropDownTownsController, $scope, deferred, testsiteAndTownSaverService;

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

    beforeEach(inject(function ($controller, $rootScope, $q,siteAndTownSaverService, MunicipiosFactory) {
        $scope = $rootScope.$new();
        deferred = $q.defer();
        testsiteAndTownSaverService=siteAndTownSaverService;

        spyOn(MunicipiosFactory, 'getTowns').and.returnValue(deferred.promise);
        spyOn(testsiteAndTownSaverService, 'setCurrentSearchedTown');

        dropDownTownsController = $controller('dropDownTownsController', {
            $scope: $scope,
            MunicipiosFactory:MunicipiosFactory,
            siteAndTownSaverService:testsiteAndTownSaverService
        });
    }));

    it('Should set current searched town', function () {
        deferred.resolve(['Bogota']);
        $scope.$apply();
        $scope.selectTown();
        expect(testsiteAndTownSaverService.setCurrentSearchedTown).toHaveBeenCalled();
    });

    it('Should set default name: Todo Cundinamarca', function () {
        deferred.resolve(['Bogota']);
        $scope.$apply();
        testsiteAndTownSaverService.getCurrentSearchedTown(null);
        expect($scope.selectedTown.nombre).toBe('Todo Cundinamarca');
    });
});
