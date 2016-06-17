'use strict';

describe('Controller: HeaderController', function () {
    var appHeaderController, $scope, deferred, translate, testsiteAndTownSaverService, testLocation;

    beforeEach(module('gemStore'));
    beforeEach(module('appHeader'));


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


    beforeEach(inject(function ($controller, $rootScope, $q, $translate, siteAndTownSaverService,$location) {
        $scope = $rootScope.$new();
        deferred = $q.defer();
        translate=$translate;
        testsiteAndTownSaverService=siteAndTownSaverService;
        testLocation=$location;

        spyOn(translate, 'use');
        spyOn(siteAndTownSaverService, 'resetSearchAndRoute');
        spyOn($location,'path');
        appHeaderController = $controller('appHeaderController', {
            $scope: $scope,
            $translate:translate,
            siteAndTownSaverService:testsiteAndTownSaverService,
            $location:$location
        });
    }));


    it('Should translate clicking on some country initial', function () {
        $scope.changeLanguage();
        expect(translate.use).toHaveBeenCalled();
    });

    it('Should reset searched keyword and route on logo click', function () {
        $scope.goToHome();
        expect(testsiteAndTownSaverService.resetSearchAndRoute).toHaveBeenCalled();
    });

    it('Should go to home on logo click', function () {
        $scope.goToHome();
        expect(testLocation.path).toHaveBeenCalled();
    });

});