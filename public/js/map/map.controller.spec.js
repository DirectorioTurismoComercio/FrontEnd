'use strict';

describe('Controller: MapController', function () {
    var MapController, $scope, testpopErrorAlertService,deferred;

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

    beforeEach(inject(function ($controller, $rootScope, $q, SearchForResultsFactory, MapService, popErrorAlertService) {
        $scope = $rootScope.$new();
        deferred = $q.defer();
        testpopErrorAlertService = popErrorAlertService;


        spyOn(SearchForResultsFactory, 'doSearch').and.returnValue(deferred.promise);
        spyOn(testpopErrorAlertService, 'showPopErrorAlert');

        MapController = $controller('MapController', {
            $scope: $scope,
            popErrorAlertService: testpopErrorAlertService,
            SearchForResultsFactory: SearchForResultsFactory,
            MapService:MapService
        });
    }));

    it('Should show error message if search has zero results', function () {
        $scope.doSearch();
        deferred.resolve([]);
        $scope.$apply();
        expect(testpopErrorAlertService.showPopErrorAlert).toHaveBeenCalled();
    });
});
