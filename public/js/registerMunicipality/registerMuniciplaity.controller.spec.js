'use strict';

describe('Controller: registerMunicipalityController', function () {
    var registerMunicipalityController, $scope, deferred, testformValidator;

    beforeEach(module('gemStore'));
    beforeEach(module('registerMunicipality'));


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


    beforeEach(inject(function ($controller,$q,$rootScope, formValidator) {
        $scope = $rootScope.$new();
        deferred = $q.defer();
        testformValidator=formValidator;

        registerMunicipalityController = $controller('registerMunicipalityController', {
            $scope: $scope,
            formValidator:testformValidator

        });
    }));


    it('Should validate the email contains .X domain', function () {
        $scope.municipalityData.email='town@gmail.com';
        $scope.$digest();
        expect($scope.isValidEmail).toBe(true);

        $scope.municipalityData.email='town@';
        $scope.$digest();
        expect($scope.isValidEmail).toBe(false);
    });

});