'use strict';

describe('Controller: registerMunicipalityController', function () {
    var registerMunicipalityController, $scope, deferred, testformValidator, testLocation, testngDialog;

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


    beforeEach(inject(function ($controller,$q,$rootScope, formValidator, $location, ngDialog) {
        $scope = $rootScope.$new();
        deferred = $q.defer();
        testformValidator=formValidator;
        testLocation=$location;
        testngDialog=ngDialog;

        spyOn($location,'path');
        spyOn(formValidator,'emailAlreadyExistsShowError');
        spyOn(ngDialog,'open');

        registerMunicipalityController = $controller('registerMunicipalityController', {
            $scope: $scope,
            formValidator:testformValidator,
            ngDialog:testngDialog

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

    it('Should redirect to home when user click goHome button', function () {
        $scope.goHome();
        expect(testLocation.path).toHaveBeenCalled();
    });

    it('Should set to True submitted when user clicks RegisterButton', function () {
        $scope.save();
        expect($scope.submitted).toBe(true);
    });

    it('Should not show registerLoading when user clicks save and form fields are not valids', function () {
        $scope.municipalityData = {
            name: undefined,
            email: undefined,
            password: undefined
        };
        $scope.municipalityData.email='town@';
        $scope.$digest();

        $scope.save();
        expect($scope.registerLoading).toBe(false);
    });

    it('Should set to True submitted when user clicks RegisterButton', function () {
        $scope.save();
        expect($scope.submitted).toBe(true);
    });

    it('Should show registerLoading when user clicks save and form fields are valids', function () {
        setValidFormFields($scope);
        $scope.save();
        expect($scope.registerLoading).toBe(true);
    });

    function setValidFormFields($scope) {
        $scope.municipalityData = {
            name: 'chía',
            email: 'chia@chia.com',
            password: '1234567'
        };
        $scope.$digest();
    }

});