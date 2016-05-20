'use strict';

describe('Controller: registerTraderController', function () {
    var registerTradeController, $scope, deferred;

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


    beforeEach(inject(function ($controller,$q,$rootScope,$auth) {
        $scope = $rootScope.$new();
        deferred = $q.defer();

        spyOn($auth, 'authenticate').and.returnValue(deferred.promise);
        registerTradeController = $controller('registerTradeController', {
            $scope: $scope,
            $auth:$auth
        });
    }));

    it('Should get FB or Google data and set Fullname and email', function () {
        var response={
            data:{
                first_name:'Pepe Pepito',
                last_name:'Pepillo Grillo',
                email:'pepe@grillo.com'
            }
        };
        $scope.getSocialMediaInfo();
        deferred.resolve(response);
        $scope.$apply();
        expect($scope.traderName).toBe('Pepe Pepito');
        expect($scope.traderLastName).toBe('Pepillo Grillo');
        expect($scope.traderEmail).toBe('pepe@grillo.com');
    });
});