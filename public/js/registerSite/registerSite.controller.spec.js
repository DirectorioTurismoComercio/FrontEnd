'use strict';

describe('Controller: registerSiteController', function () {
    var registerSiteController, $scope, deferred, testMapService, testgeolocation, testcategories;

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


    beforeEach(inject(function ($controller, $http, $rootScope, $q, MapService, uiGmapIsReady, geolocation, categories, MunicipiosFactory) {
        $scope = $rootScope.$new();
        testMapService = MapService;
        deferred = $q.defer();
        testgeolocation = geolocation;
        testcategories=categories;

        spyOn(testMapService, 'clearRoute');
        spyOn(testMapService, 'setPinOnUserPosition');
        spyOn(geolocation, 'getLocation').and.returnValue(deferred.promise);
        spyOn(categories, 'getCategories').and.returnValue(deferred.promise);
        spyOn(MunicipiosFactory, 'getTowns').and.returnValue(deferred.promise);
        registerSiteController = $controller('registerSiteController', {
            $scope: $scope,
            $http: $http,
            MapService: MapService,
            uiGmapIsReady: uiGmapIsReady,
            geolocation: testgeolocation,
            categories:testcategories,
            MunicipiosFactory:MunicipiosFactory
        });
    }));

    it('Should clear routes', function () {
        expect(testMapService.clearRoute).toHaveBeenCalled();
    });

    it('Should  get user position when clicks on current position button', function () {
        $scope.getUserPosition();
        deferred.resolve({
                coords: {
                    latitude: 1,
                    longitude: 1
                }

        });
        $scope.$apply();
        expect(testMapService.setPinOnUserPosition).toHaveBeenCalled();
    });

});