'use strict';

describe('Controller: HowItWorksController', function () {
    var HowItWorksController, $scope, deferred, location, testsiteAndTownSaverService;

    beforeEach(module('gemStore'));
    beforeEach(module('howItWorks'));


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


    beforeEach(inject(function ($controller, $rootScope, $q, $location, siteAndTownSaverService) {
        $scope = $rootScope.$new();
        deferred = $q.defer();
        location = $location;
        testsiteAndTownSaverService=siteAndTownSaverService;

        spyOn(location, 'path');
        spyOn(testsiteAndTownSaverService, 'resetSearchAndRoute');


        HowItWorksController = $controller('HowItWorksController', {
            $scope: $scope,
            $location: location,
            siteAndTownSaverService:testsiteAndTownSaverService,
        });
    }));


    it('Should reset search and route parameter on click go to map search tab', function () {
        $scope.goToMapSearchTab();
        expect(testsiteAndTownSaverService.resetSearchAndRoute).toHaveBeenCalled();
    });

    it('Should reset search and route parameter on click go to map route tab', function () {
        $scope.goToMapRouteTab();
        expect(testsiteAndTownSaverService.resetSearchAndRoute).toHaveBeenCalled();
    });

    it('Should redirect map on click go to map search tab', function () {
        $scope.goToMapSearchTab();
        expect(location.path).toHaveBeenCalled();
    });

    it('Should redirect map on click go to map route tab', function () {
        $scope.goToMapRouteTab();
        expect(location.path).toHaveBeenCalled();
    });

});