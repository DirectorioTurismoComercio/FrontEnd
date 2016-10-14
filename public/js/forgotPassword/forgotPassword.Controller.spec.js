'use strict';

describe('Controller: forgotPasswordController', function () {
    var forgotPasswordController, $scope, deferred, testmessageService;

    beforeEach(module('gemStore'));
    beforeEach(module('forgotPassword'));


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


    beforeEach(inject(function ($controller,$httpBackend, $rootScope, $q, messageService) {
        $scope = $rootScope.$new();
        deferred = $q.defer();
        testmessageService=messageService;
        spyOn(messageService,'showErrorMessage');

        forgotPasswordController = $controller('forgotPasswordController', {
            $scope: $scope,
            messageService:testmessageService
        });
    }));


    it('Should set to True submitted when user clicks sendRecoveryPasswordEmail', function () {
        $scope.sendRecoveryPasswordEmail();
        expect($scope.submitted).toBe(true);
    });

    it('Should show error if user clicks sendRecoveryPasswordEmail and fields are filled incorrectly ', function () {
        $scope.sendRecoveryPasswordEmail();
        expect(testmessageService.showErrorMessage).toHaveBeenCalled();
    });

});