'use strict';

describe('Controller: registerTraderController', function () {
    var registerTradeController, $scope, deferred, testauthenticationService;

    beforeEach(module('gemStore'));
    beforeEach(module('registerTrader'));


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


    beforeEach(inject(function ($controller,$q,$rootScope,$auth, authenticationService) {
        $scope = $rootScope.$new();
        deferred = $q.defer();
        testauthenticationService=authenticationService;

        spyOn($auth, 'authenticate').and.returnValue(deferred.promise);
        spyOn(testauthenticationService, 'logout');
        spyOn(testauthenticationService, 'loginSocialMedia').and.returnValue(deferred.promise);
        registerTradeController = $controller('registerTradeController', {
            $scope: $scope,
            $auth:$auth,
            authenticationService:testauthenticationService
        });
    }));

});