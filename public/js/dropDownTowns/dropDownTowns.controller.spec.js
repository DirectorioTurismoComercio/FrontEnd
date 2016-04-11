'use strict';

describe('Controller: dropDownTownsController', function () {
    var dropDownTownsController, $scope, testsiteAndTownSaverService;

    beforeEach(module('gemStore'));
    beforeEach(module('dropDownTowns'));

    beforeEach(inject(function ($controller, $rootScope, $q,siteAndTownSaverService) {
        $scope = $rootScope.$new();
        testsiteAndTownSaverService=siteAndTownSaverService;

        spyOn(testsiteAndTownSaverService, 'setCurrentSearchedTown');

        dropDownTownsController = $controller('dropDownTownsController', {
            $scope: $scope,
            siteAndTownSaverService:testsiteAndTownSaverService
        });
    }));

    it('Should set current searched town', function () {
        $scope.selectedTown();
        expect(testsiteAndTownSaverService.setCurrentSearchedTown).toHaveBeenCalled();
    });

});
