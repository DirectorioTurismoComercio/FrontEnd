'use strict';

describe('Controller: registerMunicipalityAccountController', function () {
    var municipalityInfoController, $scope, deferred, testLocation, $httpBackendTest, testmunicipalityInformationService, testAPI_CONFIG, testMunicipiosFactory;

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


    beforeEach(inject(function ($controller,$q,$rootScope, $location, $httpBackend, API_CONFIG, municipalityInformationService, MunicipiosFactory) {
        $scope = $rootScope.$new();
        deferred = $q.defer();
        testLocation=$location;
        testAPI_CONFIG=API_CONFIG;
        $httpBackendTest=$httpBackend;
        testmunicipalityInformationService=municipalityInformationService;
        testMunicipiosFactory=MunicipiosFactory;

        spyOn($location,'path');

        municipalityInfoController = $controller('municipalityInfoController', {
            $scope: $scope,
            $location:testLocation,
            API_CONFIG:testAPI_CONFIG,
            municipalityInformationService:testmunicipalityInformationService,
            MunicipiosFactory:testMunicipiosFactory

        });
    }));

    it('Should redirect to home when user clicks changeViewHome button', function () {
        $scope.changeViewHome();
        expect(testLocation.path).toHaveBeenCalled();
    });

});