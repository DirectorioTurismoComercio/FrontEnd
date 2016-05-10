'use strict';

describe('Controller: HeaderController', function () {
    var appHeaderController, $scope, deferred, translate, location, testsiteAndTownSaverService;

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


    beforeEach(inject(function ($controller, $rootScope, $q, $translate, $location, siteAndTownSaverService) {
        $scope = $rootScope.$new();
        deferred = $q.defer();
        translate=$translate;
        location = $location;
        testsiteAndTownSaverService=siteAndTownSaverService;

        spyOn(translate, 'use');
        spyOn(location, 'path');
        spyOn(testsiteAndTownSaverService, 'resetSearchAndRoute');


        appHeaderController = $controller('appHeaderController', {
            $scope: $scope,
            $translate:translate,
            $location: location,
            siteAndTownSaverService:testsiteAndTownSaverService,
        });
    }));


    it('Should transate clicking on some country flag', function () {
        $scope.changeLanguage();
        expect(translate.use).toHaveBeenCalled();
    });

    it('Should reset every searched site, town and route when user clicks logo', function () {
        $scope.goToHome();
        expect(testsiteAndTownSaverService.resetSearchAndRoute).toHaveBeenCalled();
    });


    it('Should redirect to home when user clicks logo', function () {
        $scope.goToHome();
        expect(location.path).toHaveBeenCalled();
    });

});