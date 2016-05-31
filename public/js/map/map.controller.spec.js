'use strict';

describe('Controller: MapController', function () {
    var MapController, $scope, testpopErrorAlertService, deferred, MapServiceTest;

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

    beforeEach(inject(function ($controller, $rootScope, $q, SearchForResultsFactory, MapService, messageService) {
        $scope = $rootScope.$new();
        deferred = $q.defer();
        testpopErrorAlertService = messageService;
        MapServiceTest=MapService;

        spyOn(SearchForResultsFactory, 'doSearch').and.returnValue(deferred.promise);
        spyOn(testpopErrorAlertService, 'showErrorMessage');
        spyOn(MapServiceTest, 'clearRoute');

        MapController = $controller('MapController', {
            $scope: $scope,
            messageService: testpopErrorAlertService,
            SearchForResultsFactory: SearchForResultsFactory,
            MapService: MapServiceTest
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

});
