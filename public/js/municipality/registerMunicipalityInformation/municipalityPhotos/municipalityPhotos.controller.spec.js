'use strict';

describe('Controller: municipalityPhotosController', function () {
    var municipalityPhotosController, $scope, deferred, testLocation, testmunicipalityInformationService;

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


    beforeEach(inject(function ($controller,$q,$rootScope, $location, municipalityInformationService) {
        $scope = $rootScope.$new();
        deferred = $q.defer();
        testLocation=$location;
        testmunicipalityInformationService=municipalityInformationService;


        spyOn($location,'path');

        municipalityPhotosController = $controller('municipalityPhotosController', {
            $scope: $scope,
            $location:testLocation,
            municipalityInformationService:testmunicipalityInformationService
        });
    }));

    it('Should hide * from main phot when user upload main picture', function () {
        $scope.mainPhotoOnClick();
        expect($scope.showMunicipalityMainPhotoRequired).toBe(false);
    });

    it('Should redirect to municipality location when user clicks goMunicipalityLocation', function () {
        $scope.goMunicipalityLocation();
        expect(testLocation.path).toHaveBeenCalled();
    });

});