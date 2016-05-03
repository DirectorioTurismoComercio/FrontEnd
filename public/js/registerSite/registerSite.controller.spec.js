'use strict';

describe('Controller: registerSiteController', function () {
    var registerSiteController, $scope, testpopErrorAlertService;

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


    beforeEach(inject(function ($controller,$http, $rootScope, MapService, uiGmapIsReady, popErrorAlertService) {
        $scope = $rootScope.$new();
        testpopErrorAlertService=popErrorAlertService;

        spyOn(testpopErrorAlertService, 'showPopErrorAlert');
        registerSiteController = $controller('registerSiteController', {
            $scope: $scope,
            $http: $http,
            MapService: MapService,
            uiGmapIsReady:uiGmapIsReady,
            popErrorAlertService:popErrorAlertService
        });
    }));

    function showPopErrorAlertHasBennCalled(){
        $scope.register();
        expect(testpopErrorAlertService.showPopErrorAlert).toHaveBeenCalled();
    }

    it('Should validate that user filled phone field', function () {
        $scope.sitePhoneNumber='';
        showPopErrorAlertHasBennCalled();
    });

    it('Should validate that phone number contains only numbers', function () {
        $scope.sitePhoneNumber='53543abc';
        showPopErrorAlertHasBennCalled();
    });

    it('Should validate that user filled opening hours', function () {
        $scope.sitePhoneNumber='42342';
        $scope.openingHours='';
        showPopErrorAlertHasBennCalled();
    });

    it('Should validate that user filled business name', function () {
        $scope.sitePhoneNumber='42342';
        $scope.openingHours='Lunes a viernes';
        $scope.businessName='';
        showPopErrorAlertHasBennCalled();
    });

    it('Should validate that user filled business location', function () {
        $scope.sitePhoneNumber='42342';
        $scope.openingHours='Lunes a viernes';
        $scope.businessName="Pepe's";
        $scope.businessLocation='';
        showPopErrorAlertHasBennCalled();
    });

    it('Should validate that user filled business description', function () {
        $scope.sitePhoneNumber='42342';
        $scope.openingHours='Lunes a viernes';
        $scope.businessName="Pepe's";
        $scope.businessLocation='4.2,-72.4';
        $scope.businessDescription='';
        showPopErrorAlertHasBennCalled();
    });

    it('Should validate that user filled tags section', function () {
        $scope.sitePhoneNumber='42342';
        $scope.openingHours='Lunes a viernes';
        $scope.businessName="Pepe's";
        $scope.businessLocation='4.2,-72.4';
        $scope.businessDescription='bla bla bla';
        $scope.tags='';
        showPopErrorAlertHasBennCalled();
    });

    it('Should validate that user filled email field', function () {
        $scope.sitePhoneNumber='42342';
        $scope.openingHours='Lunes a viernes';
        $scope.businessName="Pepe's";
        $scope.businessLocation='4.2,-72.4';
        $scope.businessDescription='bla bla bla';
        $scope.tags='superPepe';
        $scope.businessEmail='';
        showPopErrorAlertHasBennCalled();
    });
});