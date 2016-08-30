'use strict';

describe('Controller: registerMunicipalityAccountController', function () {
    var registerMunicipalityAccountController, $scope, deferred, testformValidator, testLocation, $httpBackendTest, testngDialog, testauthenticationService, testAPI_CONFIG;

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


    beforeEach(inject(function ($controller,$q,$rootScope, formValidator, $location, ngDialog, $httpBackend, authenticationService, API_CONFIG) {
        $scope = $rootScope.$new();
        deferred = $q.defer();
        testformValidator=formValidator;
        testLocation=$location;
        testngDialog=ngDialog;
        testauthenticationService=authenticationService;
        testAPI_CONFIG=API_CONFIG;
        $httpBackendTest=$httpBackend;

        spyOn($location,'path');
        spyOn(formValidator,'emailAlreadyExistsShowError');
        spyOn(ngDialog,'open');
        spyOn(ngDialog,'close');

        registerMunicipalityAccountController = $controller('registerMunicipalityAccountController', {
            $scope: $scope,
            formValidator:testformValidator,
            ngDialog:testngDialog,
            authenticationService:testauthenticationService,
            API_CONFIG:testAPI_CONFIG

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

    xit('Should set Token when user register', function () {
        setValidFormFields($scope);
        $scope.save();
        $httpBackendTest.when('POST',testAPI_CONFIG.url+testAPI_CONFIG.user).respond(200,{data:{key:'1232'}});
        $httpBackendTest.flush();
        expect(testngDialog.open).toHaveBeenCalled();
    });

    it('Should hide loading and show Error Message when register fails', function () {
        setValidFormFields($scope);
        $scope.save();
        $httpBackendTest.when('POST',testAPI_CONFIG.url+testAPI_CONFIG.user).respond(404);
        $httpBackendTest.flush();
        expect($scope.registerLoading).toBe(false);
    });

    it('Should close pop up window and redirect to municipality info when registration is done', function () {
        $scope.doneRegistration();
        expect(testngDialog.close).toHaveBeenCalled();
        expect(testLocation.path).toHaveBeenCalled();

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