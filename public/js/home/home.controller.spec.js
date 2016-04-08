'use strict';

describe('Controller: HomeController', function () {
    var homeController, $scope, $qTest, deferred, location, mdDialog;

    beforeEach(module('gemStore'));

    beforeEach(inject(function ($controller, $rootScope, $q, SearchForResultsFactory, $location, $mdDialog) {
        $scope = $rootScope.$new();
        $qTest=$q;
        deferred=$q.defer();
        mdDialog=$mdDialog;

        spyOn(SearchForResultsFactory,'doSearch').and.returnValue(deferred.promise);
        spyOn(mdDialog, 'show');

        homeController = $controller('HomeController', {
            $scope: $scope,
            SearchForResultsFactory: SearchForResultsFactory,
            $mdDialog:mdDialog
        });
    }));

    it('Search callback should exist', function () {
        expect($scope.doSearch).toBeDefined();
    });
/*
    it('Should show error message if search has zero results', function () {
        deferred.resolve([{}]);
        $scope.$apply();
        $scope.doSearch();
        expect(mdDialog.show).toHaveBeenCalled();
    });
    it('Should show error message if has ocurred an error', function () {
        deferred.reject();
        $scope.$apply();
        $scope.doSearch();
        expect(console.log).toHaveBeenCalled();
    });
*/
});