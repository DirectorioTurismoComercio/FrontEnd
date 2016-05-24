'use strict';

describe('Controller: searchAndRouteTabs', function () {
    var searchAndRouteTabsController, scope, testsiteAndTownSaverService;

    beforeEach(module('gemStore'));

    beforeEach(inject(function ($controller, $rootScope, siteAndTownSaverService) {
        scope = $rootScope.$new();
        testsiteAndTownSaverService=siteAndTownSaverService;

        spyOn(testsiteAndTownSaverService, 'getCurrentSearchedSite').and.returnValue('business');

        searchAndRouteTabsController = $controller('searchTabsController', {
            $scope: scope,
            siteAndTownSaverService:testsiteAndTownSaverService
        });
    }));

    it('should show searchForm if user has made a business search', function () {
        expect(scope.isSearchFormVisible).toBe(true);
    });

    it('should set to false isRouteFormVisible when showSearchForm', function () {
        scope.isRouteFormVisible=true;
        scope.showSearchForm();
        expect(scope.isRouteFormVisible).toBe(false);
    });

    it('should toggle isSearchFormVisible property when showSearchForm', function () {
        scope.isSearchFormVisible=false;
        scope.showSearchForm();
        expect(scope.isSearchFormVisible).toBe(true);
        scope.showSearchForm();
        expect(scope.isSearchFormVisible).toBe(false);
    });

    it('should set to false isSearchFormVisible when showRouteForm', function () {
        scope.isSearchFormVisible=true;
        scope.showRouteForm();
        expect(scope.isSearchFormVisible).toBe(false);
    });

    it('should toggle isRouteFormVisible property when showRouteForm', function () {
        scope.isRouteFormVisible=true;
        scope.showRouteForm();
        expect(scope.isRouteFormVisible).toBe(false);
        scope.showRouteForm();
        expect(scope.isRouteFormVisible).toBe(true);
    });
});

