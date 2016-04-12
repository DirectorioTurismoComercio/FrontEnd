'use strict';

describe('Controller: MapController', function () {
    var MapController, $scope, mdDialog,deferred;

    beforeEach(module('gemStore'));

    beforeEach(inject(function ($controller, $rootScope, $q,$mdDialog, SearchForResultsFactory, MapService) {
        $scope = $rootScope.$new();
        deferred = $q.defer();
        mdDialog = $mdDialog;


        spyOn(SearchForResultsFactory, 'doSearch').and.returnValue(deferred.promise);
        spyOn(mdDialog, 'show');

        MapController = $controller('MapController', {
            $scope: $scope,
            $mdDialog: mdDialog,
            SearchForResultsFactory: SearchForResultsFactory,
            MapService:MapService
        });
    }));

    it('Should show error message if search has zero results', function () {
        $scope.doSearch();
        deferred.resolve([]);
        $scope.$apply();
        expect(mdDialog.show).toHaveBeenCalled();
    });
});
