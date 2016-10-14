'use strict';

describe('Controller: forgotPasswordController', function () {
    var forgotPasswordController, test$translate, $scope, deferred, location, testsiteAndTownSaverService;

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


    beforeEach(inject(function ($controller,$httpBackend, $rootScope, $q) {
        $scope = $rootScope.$new();
        deferred = $q.defer();

        forgotPasswordController = $controller('forgotPasswordController', {
            $scope: $scope,
        });
    }));


    it('Should reset searched sites or routes variables on load home', function () {

    });

});