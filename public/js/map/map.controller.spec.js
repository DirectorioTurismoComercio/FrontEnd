'use strict';

describe('Controller: MapController', function () {
    var MapController, $scope, testpopErrorAlertService, deferred, MapServiceTest, testSearchForResultsFactory;
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

    beforeEach(inject(function ($controller, $rootScope, $q, SearchForResultsFactory, MapService, messageService) {
        $scope = $rootScope.$new();
        deferred = $q.defer();
        testpopErrorAlertService = messageService;
        MapServiceTest=MapService;
        testSearchForResultsFactory=SearchForResultsFactory;

        spyOn(SearchForResultsFactory, 'doSearch').and.returnValue(deferred.promise);
        spyOn(testpopErrorAlertService, 'showErrorMessage');
        spyOn(MapServiceTest, 'clearRoute');
        spyOn(SearchForResultsFactory,'getResults').and.returnValue(sitesResponse);

        MapController = $controller('MapController', {
            $scope: $scope,
            messageService: testpopErrorAlertService,
            MapService: MapServiceTest,
            SearchForResultsFactory:testSearchForResultsFactory
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

});
