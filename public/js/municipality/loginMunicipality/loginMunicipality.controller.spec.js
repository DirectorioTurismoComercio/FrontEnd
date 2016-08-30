'use strict';

describe('Controller: registerMunicipalityAccountController', function () {
    var loginMunicipalityController, $scope, deferred, testLocation, testauthenticationService, testmessageService;

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


    beforeEach(inject(function ($controller,$q,$rootScope, $location, authenticationService, messageService) {
        $scope = $rootScope.$new();
        deferred = $q.defer();
        testLocation=$location;
        testauthenticationService=authenticationService;
        testmessageService=messageService;

        spyOn(authenticationService,'login');
        spyOn(messageService,'showErrorMessage');

        loginMunicipalityController = $controller('loginMunicipalityController', {
            $scope: $scope,
            authenticationService:testauthenticationService,
            messageService:testmessageService
        });
    }));

    it('Should set to True submitted when user clicks loginMunicipality', function () {
        $scope.loginMunicipality();
        expect($scope.submitted).toBe(true);
    });

    xit('Should show loading when user clicks loginMunicipality and fields are filled', function () {
        setValidFormFields($scope);
        $scope.loginMunicipality();
        expect($scope.loginLoading).toBe(true);
    });

    xit('Should show call authenticationService when user clicks loginMunicipality and fields are filled correctly', function () {
        setValidFormFields($scope);
        $scope.loginMunicipality();
        expect(testauthenticationService.login).toHaveBeenCalled();
    });

    it('Should show error if user clicks loginMunicipality and fields are filled incorrectly ', function () {
        $scope.loginMunicipality();
        expect(testmessageService.showErrorMessage).toHaveBeenCalled();
    });

    function setValidFormFields($scope) {
        $scope.loginMunicipalityFields.email='321@das.com';
        $scope.loginMunicipalityFields.password='1234567';
    }

});