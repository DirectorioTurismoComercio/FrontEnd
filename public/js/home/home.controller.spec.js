'use strict';

describe('Controller: HomeController', function () {
    var homeController, $scope, $qTest, deferred, mdDialog;

    beforeEach(module('gemStore'));
    beforeEach(module('home'));

    beforeEach(inject(function ($controller, $rootScope, $q, SearchForResultsFactory, $mdDialog) {
        $scope = $rootScope.$new();
        deferred = $q.defer();
        $qTest = $q;
        mdDialog = $mdDialog;

        spyOn(SearchForResultsFactory, 'doSearch').and.returnValue(deferred.promise);
        spyOn(mdDialog, 'show');

        homeController = $controller('HomeController', {
            $scope: $scope,
            SearchForResultsFactory: SearchForResultsFactory,
            $mdDialog: mdDialog
        });
    }));

    it('Search callback should exist', function () {
        expect($scope.doSearch).toBeDefined();
    });

    it('Should show error message if search has zero results', function () {
        $scope.doSearch();
        deferred.resolve([]);
        $scope.$apply();
        expect(mdDialog.show).toHaveBeenCalled();
    });
    
});