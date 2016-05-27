'use strict';

describe('Controller: registerSiteController', function () {
    var registerSiteController, $scope, testpopErrorAlertService, testMapService;

    beforeEach(module('gemStore'));
    beforeEach(module('registerSite'));


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


    beforeEach(inject(function ($controller,$http, $rootScope, MapService, uiGmapIsReady) {
        $scope = $rootScope.$new();
        testMapService=MapService;

        spyOn(testMapService, 'clearRoute');
        registerSiteController = $controller('registerSiteController', {
            $scope: $scope,
            $http: $http,
            MapService: MapService,
            uiGmapIsReady:uiGmapIsReady,
        });
    }));

    it('Should clear routes', function () {
        expect(testMapService.clearRoute).toHaveBeenCalled();
    });

});