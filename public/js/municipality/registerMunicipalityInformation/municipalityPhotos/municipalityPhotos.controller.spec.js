'use strict';

describe('Controller: municipalityPhotosController', function () {
    var municipalityPhotosController, $scope, deferred, testLocation, testmunicipalityInformationService, test$cookies, testmessageService;

    beforeEach(module('gemStore'));
    beforeEach(module('Municipality'));


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


    beforeEach(inject(function ($controller,$q,$rootScope, $location, municipalityInformationService, messageService, $cookies) {
        $scope = $rootScope.$new();
        deferred = $q.defer();
        testLocation=$location;
        testmunicipalityInformationService=municipalityInformationService;
        testmessageService=messageService;
        test$cookies=$cookies;

        spyOn($location,'path');

        municipalityPhotosController = $controller('municipalityPhotosController', {
            $scope: $scope,
            $location:testLocation,
            municipalityInformationService:testmunicipalityInformationService,
            messageService:testmessageService,
            $cookies:test$cookies
        });
    }));

    xit('Should hide * from main phot when user upload main picture', function () {
        $scope.mainPhotoOnClick();
        expect($scope.showMunicipalityMainPhotoRequired).toBe(false);
    });

    xit('Should redirect to municipality location when user clicks goMunicipalityLocation', function () {
        $scope.goMunicipalityLocation();
        expect(testLocation.path).toHaveBeenCalled();
    });

});