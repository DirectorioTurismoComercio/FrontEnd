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

    it('Should get FB or Google data and set Fullname and email', function () {
        var response={
            data:{
                first_name:'Pepe Pepito',
                last_name:'Pepillo Grillo',
                email:'pepe@grillo.com'
            }
        };
        $scope.authenticate();
        deferred.resolve(response);
        $scope.$apply();
        expect($scope.usuario.nombres).toBe('Pepe Pepito');
        expect($scope.usuario.apellidos).toBe('Pepillo Grillo');
        expect($scope.usuario.correo).toBe('pepe@grillo.com');
    });
});