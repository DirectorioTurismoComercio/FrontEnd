'use strict';

describe('Controller: AccountInfoController', function () {
    var AccountInfoController, $scope, location, testauthenticationService;

    beforeEach(module('gemStore'));
    beforeEach(module('home'));


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


    beforeEach(inject(function ($controller, $rootScope, $location, authenticationService) {
        $scope = $rootScope.$new();
        location = $location;
        testauthenticationService=authenticationService;

        spyOn(location, 'path');
        spyOn(testauthenticationService, 'getUser').and.returnValue({token:'12'});


        AccountInfoController = $controller('AccountInfoController', {
            $scope: $scope,
            authenticationService: authenticationService,
            $location: location,
        });
    }));


    it('Should redirects to businessinformation on click add new business', function () {
        $scope.addBusiness();
        expect(location.path).toHaveBeenCalled();
    });


});