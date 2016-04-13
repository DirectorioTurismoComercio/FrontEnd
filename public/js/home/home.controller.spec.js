'use strict';

describe('Controller: HomeController', function () {
    var homeController, $scope, deferred, mdDialog, location, testsiteAndTownSaverService;

    beforeEach(module('gemStore'));
    beforeEach(module('home'));

    beforeEach(inject(function ($controller, $rootScope, $q, SearchForResultsFactory, $mdDialog, $location, siteAndTownSaverService) {
        $scope = $rootScope.$new();
        deferred = $q.defer();
        mdDialog = $mdDialog;
        location = $location;
        testsiteAndTownSaverService=siteAndTownSaverService;

        spyOn(SearchForResultsFactory, 'doSearch').and.returnValue(deferred.promise);
        spyOn(mdDialog, 'show');
        spyOn(location, 'path');
        spyOn(testsiteAndTownSaverService, 'setCurrentSearchedSite');

        homeController = $controller('HomeController', {
            $scope: $scope,
            SearchForResultsFactory: SearchForResultsFactory,
            $location: location,
            $mdDialog: mdDialog,
            siteAndTownSaverService:testsiteAndTownSaverService
        });
    }));

    it('Should show error message if search has zero results', function () {
        $scope.doSearch();
        deferred.resolve([]);
        $scope.$apply();
        expect(mdDialog.show).toHaveBeenCalled();
    });

    it('Should redirects to map page', function () {
        $scope.doSearch('bar');
        deferred.resolve(['Repuesta']);
        $scope.$apply();
        expect(location.path).toHaveBeenCalled();
    });

    it('Should save the current searched site', function () {
        $scope.doSearch('bar');
        deferred.resolve(['Repuesta']);
        $scope.$apply();
        expect(testsiteAndTownSaverService.setCurrentSearchedSite).toHaveBeenCalled();
    });

    it('Should show error if user does not type any place in the input box', function () {
        $scope.doSearch();
        deferred.resolve(['Repuesta']);
        $scope.$apply();
        expect(mdDialog.show).toHaveBeenCalled();
    });

});