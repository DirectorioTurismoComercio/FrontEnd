'use strict';

describe('Controller: dropDownTownsController', function () {
    var dropDownTownsController, $scope, deferred, testsiteAndTownSaverService;

    beforeEach(module('gemStore'));
    beforeEach(module('dropDownTowns'));

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
        $scope.selectedTown();
        expect(testsiteAndTownSaverService.setCurrentSearchedTown).toHaveBeenCalled();
    });

   /* it('Should set default name and Value: Todos los municipios and 1', function () {
        deferred.resolve(['Bogota']);
        $scope.$apply();
        $scope.selectedTown();
        expect(testsiteAndTownSaverService.setCurrentSearchedTown).toHaveBeenCalled();
    });*/

});
