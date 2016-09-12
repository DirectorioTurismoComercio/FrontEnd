'use strict';

describe('Controller: HomeController', function () {
    var homeController, test$translate, $scope, deferred, location, testsiteAndTownSaverService, testmessageService, MapServiceTest, testWindow;

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


    beforeEach(inject(function ($controller, $rootScope, $q, SearchForResultsFactory, $location, siteAndTownSaverService, messageService, MapService, $window, $translate) {
        $scope = $rootScope.$new();
        deferred = $q.defer();
        location = $location;
        testsiteAndTownSaverService=siteAndTownSaverService;
        testmessageService=messageService;
        MapServiceTest=MapService;
        testWindow=$window;
        test$translate=$translate;


        spyOn(SearchForResultsFactory, 'doSearch').and.returnValue(deferred.promise);
        spyOn(testmessageService, 'showErrorMessage');
        spyOn(location, 'path');
        spyOn(testsiteAndTownSaverService, 'setCurrentSearchedSite');
        spyOn(testsiteAndTownSaverService, 'resetSearchAndRoute');
        spyOn(MapServiceTest,'clearRoute');
        spyOn(testWindow,'innerWidth').and.returnValue(1000);
        spyOn(test$translate,'use').and.returnValue('es');


        homeController = $controller('HomeController', {
            $scope: $scope,
            SearchForResultsFactory: SearchForResultsFactory,
            $location: location,
            siteAndTownSaverService:testsiteAndTownSaverService,
            popErrorAlertService:messageService,
            $translate:test$translate
        });
    }));


    it('Should reset searched sites or routes variables on load home', function () {
        expect(testsiteAndTownSaverService.resetSearchAndRoute).toHaveBeenCalled();
    });

    it('Should redirects to How it Works Page', function () {
        $scope.goToHowItWorks();
        expect(location.path).toHaveBeenCalled();
    });

    it('Should show error message if search input has no keyword', function () {
        $scope.doSearch();
        deferred.resolve([]);
        $scope.$apply();
        expect(testmessageService.showErrorMessage).toHaveBeenCalled();
    });

    it('Should show error message if search has zero results', function () {
        $scope.doSearch('casa');
        deferred.resolve([]);
        $scope.$apply();
        expect(testmessageService.showErrorMessage).toHaveBeenCalled();
    });

    it('Should show catch error if has no response', function () {
        $scope.doSearch('casa');
        deferred.reject();
        $scope.$apply();
        expect(testmessageService.showErrorMessage).toHaveBeenCalled();
    });

    it('Should clear routes before making a keyword search', function () {
        $scope.doSearch('keyword');
        expect(MapServiceTest.clearRoute).toHaveBeenCalled();
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
        expect(testmessageService.showErrorMessage).toHaveBeenCalled();
    });

    it('Should go to map to show the route', function () {
        $scope.showRoute();
        expect(location.path).toHaveBeenCalled();
    });

    it('Should set desktop image of how it works if is in desktop', function () {
        expect($scope.howItWorksImage).toBe('como-funciona-comerciante-home-esp.jpg');
    });

    it('Should redirect to register trader on click button register', function () {
        $scope.goToHowItWorksTrader();
        expect(location.path).toHaveBeenCalled();
    });

});