'use strict';

describe('Controller: businessBrowserController', function () {
    var businessBrowserController, $scope, $qTest, deferred;

    beforeEach(module('gemStore'));
    beforeEach(module('businessBrowser'));

    beforeEach(inject(function ($controller, $rootScope, $q, ResultRetriever) {
        $scope = $rootScope.$new();
        deferred = $q.defer();
        $qTest = $q;

        spyOn(ResultRetriever, 'getresults').and.returnValue(deferred.promise);

        businessBrowserController = $controller('businessBrowserController', {
            $scope: $scope,
            ResultRetriever: ResultRetriever
        });
    }));

    it('Should show suggestions while user is typing', function () {
        $scope.lookForSuggestions();
        deferred.resolve(['suggestions']);
        $scope.$apply();
        expect($scope.results).not.toBe(undefined);
    });
});
