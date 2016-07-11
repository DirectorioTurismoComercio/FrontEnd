'use strict';

describe('Controller: businessInformationController', function () {
    var registerSiteController, $scope, deferred, testcategories, testlocation;

    beforeEach(module('gemStore'));
    beforeEach(module('registerSite'));


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


    beforeEach(inject(function ($controller, $http, $rootScope, $q, $location,categories, MunicipiosFactory,navigationService) {
        $scope = $rootScope.$new();
        deferred = $q.defer();
        testcategories=categories;
        testlocation=$location;

        spyOn($location,'path');
        spyOn(categories, 'getCategories').and.returnValue(deferred.promise);
        spyOn(MunicipiosFactory, 'getTowns').and.returnValue(deferred.promise);
        registerSiteController = $controller('businessInformationController', {
            $scope: $scope,
            $http: $http,
            categories:testcategories,
            MunicipiosFactory:MunicipiosFactory,
            navigationService:navigationService
        });
    }));

    it('Should go back if user clicks on go back', function () {
        $scope.changeViewHome();
        expect(testlocation.path).toHaveBeenCalled();
    });

});
