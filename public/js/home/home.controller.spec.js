'use strict';

describe('Controller: HomeController', function () {
    var homeController, $scope, $qTest, deferred, location, mdDialog, searchFactory, mockSearch;

    beforeEach(module('gemStore'));
    beforeEach(module('home'));
    
    beforeEach(inject(function ($controller, $rootScope, $q, SearchForResultsFactory, $location, $mdDialog) {
        $scope = $rootScope.$new();
        $qTest = $q;

        mdDialog = $mdDialog;

        searchFactory = SearchForResultsFactory;

        mockSearch =
        {
            doSearch:function(){
                deferred = $q.defer();
                return deferred.promise
            }
        }


        spyOn(SearchForResultsFactory, 'doSearch').and.returnValue();
        spyOn(mdDialog, 'show');

        homeController = $controller('HomeController', {
            $scope: $scope,
            SearchForResultsFactory: mockSearch,
            $mdDialog: mdDialog
        });
    }));

    it('Search callback should exist', function () {
        expect($scope.doSearch).toBeDefined();
    });

    it('Should show error message if search has zero results', function () {
        $scope.doSearch();
        deferred.resolve([])
        $scope.$apply();
        expect(mdDialog.show).toHaveBeenCalled();
    });
    /*
     it('Should show error message if has ocurred an error', function () {
     deferred.reject();
     $scope.$apply();
     $scope.doSearch();
     expect(console.log).toHaveBeenCalled();
     });
     */
});