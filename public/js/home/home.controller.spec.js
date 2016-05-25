'use strict';

describe('Controller: HomeController', function () {
    var homeController, $scope, deferred, location, testsiteAndTownSaverService, testpopErrorAlertService;

    beforeEach(module('gemStore'));
    beforeEach(module('home'));


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


    beforeEach(inject(function ($controller, $rootScope, $q, SearchForResultsFactory, $location, siteAndTownSaverService, messageService) {
        $scope = $rootScope.$new();
        deferred = $q.defer();
        location = $location;
        testsiteAndTownSaverService=siteAndTownSaverService;
        testpopErrorAlertService=messageService;


        spyOn(SearchForResultsFactory, 'doSearch').and.returnValue(deferred.promise);
        spyOn(testpopErrorAlertService, 'showErrorMessage');
        spyOn(location, 'path');
        spyOn(testsiteAndTownSaverService, 'setCurrentSearchedSite');

        homeController = $controller('HomeController', {
            $scope: $scope,
            SearchForResultsFactory: SearchForResultsFactory,
            $location: location,
            siteAndTownSaverService:testsiteAndTownSaverService,
            popErrorAlertService:messageService
        });
    }));


    it('Should redirects to How it Works Page', function () {
        $scope.goToHowItWorks();
        expect(location.path).toHaveBeenCalled();
    });

    it('Should show error message if search has zero results', function () {
        $scope.doSearch();
        deferred.resolve([]);
        $scope.$apply();
        expect(testpopErrorAlertService.showErrorMessage).toHaveBeenCalled();
    });

    it('Should show error message if make route with no origin', function () {
        $scope.routeToController.routeFrom='';
        $scope.calculateRoute();
        expect(testpopErrorAlertService.showErrorMessage).toHaveBeenCalled();
    });

    it('Should show error message if make route with no destination', function () {
        $scope.routeToController.routeTo='';
        $scope.calculateRoute();
        expect(testpopErrorAlertService.showErrorMessage).toHaveBeenCalled();
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
        expect(testpopErrorAlertService.showErrorMessage).toHaveBeenCalled();
    });
});