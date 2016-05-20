'use strict';

describe('Controller: businessBrowserController', function () {
    var businessBrowserController, $scope, deferred, testsiteAndTownSaverService;

    beforeEach(module('gemStore'));
    beforeEach(module('businessBrowser'));

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

    beforeEach(inject(function ($controller, $rootScope, $q, ResultRetriever, siteAndTownSaverService) {
        $scope = $rootScope.$new();
        deferred = $q.defer();

        testsiteAndTownSaverService = siteAndTownSaverService;


        spyOn(ResultRetriever, 'getresults').and.returnValue(deferred.promise);
        spyOn(testsiteAndTownSaverService, 'getCurrentSearchedSite').and.returnValue('business');

        businessBrowserController = $controller('businessBrowserController', {
            $scope: $scope,
            ResultRetriever: ResultRetriever,
            siteAndTownSaverService: testsiteAndTownSaverService
        });
    }));

    it('Should show the last searched site', function () {
        expect($scope.result).toBe('business');
    });

    it('Should show suggestions while user is typing', function () {
        $scope.lookForSuggestions();
        deferred.resolve(['suggestions']);
        $scope.$apply();
        expect($scope.results).not.toBe(undefined);
    });
});
