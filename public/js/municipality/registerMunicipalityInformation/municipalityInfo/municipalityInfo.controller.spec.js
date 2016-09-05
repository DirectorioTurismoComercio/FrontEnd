'use strict';

describe('Controller: municipalityInfoController', function () {
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

        initializeMunicipalityValues(testmunicipalityInformationService);

        municipalityInfoController = $controller('municipalityInfoController', {
            $scope: $scope,
            $location:testLocation,
            API_CONFIG:testAPI_CONFIG,
            municipalityInformationService:testmunicipalityInformationService,
            MunicipiosFactory:testMunicipiosFactory

        });
    }));

    it('Should redirect to home when user clicks changeViewHome button', function () {
        $scope.changeViewMunicipalityAccount();
        expect(testLocation.path).toHaveBeenCalled();
    });

    it('Should get municipalityInformationService information', function () {
        expect($scope.municipalitySelected).toBe('cota');
        expect($scope.municipalityPhoneNumber).toBe('1234');
        expect($scope.municipalityWhatsapp).toBe('4321');
        expect($scope.municipalityDescription).toBe('está en cota');
        expect($scope.municipalityOpeningHours).toBe('10am-10pm');
    });

    it('Should redirect to home when user clicks cancelRegister button', function () {
        $scope.cancelRegister();
        expect(testLocation.path).toHaveBeenCalled();
    });


    function initializeMunicipalityValues(testmunicipalityInformationService) {
        testmunicipalityInformationService.setMunicipalitySelected('cota');
        testmunicipalityInformationService.setMunicipalityPhoneNumber('1234');
        testmunicipalityInformationService.setMunicipalityWhatsapp('4321');
        testmunicipalityInformationService.setMunicipalityWeb('4321.com');
        testmunicipalityInformationService.setMunicipalityDescription('está en cota');
        testmunicipalityInformationService.setMunicipalityOpeningHours('10am-10pm');
    }

});