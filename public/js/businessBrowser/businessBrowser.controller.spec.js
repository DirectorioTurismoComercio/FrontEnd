'use strict';

describe('Controller: businessBrowserController', function () {
    var businessBrowserController, $scope, deferred, testsiteAndTownSaverService;

    beforeEach(module('gemStore'));
    beforeEach(module('businessBrowser'));

    beforeEach(inject(function ($controller, $rootScope, $q, ResultRetriever,siteAndTownSaverService) {
        $scope = $rootScope.$new();
        deferred = $q.defer();

        testsiteAndTownSaverService=siteAndTownSaverService;

        spyOn(ResultRetriever, 'getresults').and.returnValue(deferred.promise);
        spyOn(testsiteAndTownSaverService, 'getCurrentSearchedSite').and.returnValue('business');

        businessBrowserController = $controller('businessBrowserController', {
            $scope: $scope,
            ResultRetriever: ResultRetriever,
            siteAndTownSaverService:testsiteAndTownSaverService
        });
    }));

    it('Should show the last searched site', function () {
        expect($scope.browserBusinessPlaceholder).toBe('business');
    });

    it('Should show suggestions while user is typing', function () {
        $scope.lookForSuggestions();
        deferred.resolve(['suggestions']);
        $scope.$apply();
        expect($scope.results).not.toBe(undefined);
    });
});
