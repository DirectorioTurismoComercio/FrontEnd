'use strict';

describe('Controller: HomeController', function () {
    var homeController, $scope, $qTest, deferred, mdDialog, location;

    beforeEach(module('gemStore'));
    beforeEach(module('home'));

    beforeEach(inject(function ($controller, $rootScope, $q, SearchForResultsFactory, $mdDialog, $location) {
        $scope = $rootScope.$new();
        deferred = $q.defer();
        $qTest = $q;
        mdDialog = $mdDialog;
        location = $location;

        spyOn(SearchForResultsFactory, 'doSearch').and.returnValue(deferred.promise);
        spyOn(mdDialog, 'show');
        spyOn(location, 'path');

        homeController = $controller('HomeController', {
            $scope: $scope,
            SearchForResultsFactory: SearchForResultsFactory,
            $location: location,
            $mdDialog: mdDialog
        });
    }));

    it('Should show error message if search has zero results', function () {
        $scope.doSearch();
        deferred.resolve([]);
        $scope.$apply();
        expect(mdDialog.show).toHaveBeenCalled();
    });

    it('Should redirects to map page', function () {
        $scope.doSearch();
        deferred.resolve(['Repuesta']);
        $scope.$apply();
        expect(location.path).toHaveBeenCalled();
    });

});