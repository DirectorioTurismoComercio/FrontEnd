'use strict';

describe('Controller: municipalityRouteController', function () {
    var registerMunicipalityAccountController, $scope, testLocation, testmunicipalityInformationService;

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


    beforeEach(inject(function ($controller, $rootScope, $location,municipalityInformationService) {
        $scope = $rootScope.$new();
        testLocation=$location;
        testmunicipalityInformationService=municipalityInformationService;

        testmunicipalityInformationService.setMunicipalityName({
            id: 3,
            nombre: "Anapoima",
            latitud: "4.565941800000000000",
            longitud: "-74.564331300000000000"
        })

        spyOn($location,'path');


        registerMunicipalityAccountController = $controller('municipalityRouteController', {
            $scope: $scope,
            $location:testLocation
        });
    }));


    it('Should redirect to municipality account if user clicks changeViewMunicipalityAccount', function () {
        $scope.changeViewMunicipalityAccount();
        expect(testLocation.path).toHaveBeenCalled();
    });

});