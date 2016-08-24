'use strict';

describe('Controller: searchAndRouteTabs', function () {
    var searchAndRouteTabsController, scope, testsiteAndTownSaverService, testMapService;

    beforeEach(module('gemStore'));

    beforeEach(inject(function ($controller, $rootScope, siteAndTownSaverService, MapService, KEYWORD_SEARCH_SECTION, ROUTE_SEARCH_SECTION) {
        scope = $rootScope.$new();
        testsiteAndTownSaverService=siteAndTownSaverService;
        testMapService=MapService;

        spyOn(testsiteAndTownSaverService, 'getCurrentSearchedSite').and.returnValue('business');
        spyOn(MapService,'addAutocompleteFeature');

        searchAndRouteTabsController = $controller('searchTabsController', {
            $scope: scope,
            siteAndTownSaverService:testsiteAndTownSaverService,
            MapService:testMapService,
            KEYWORD_SEARCH_SECTION:KEYWORD_SEARCH_SECTION,
            ROUTE_SEARCH_SECTION:ROUTE_SEARCH_SECTION
        });
    }));

    it('should show searchForm if user has made a business search', function () {
        scope.showSelectedSection(scope.KEYWORD_SEARCH_SECTION);
        expect(scope.isSearchFormVisible).toBe(true);
    });

    it('should set to false isRouteFormVisible when showSearchForm', function () {
        scope.showSelectedSection(scope.KEYWORD_SEARCH_SECTION);
        expect(scope.isRouteFormVisible).toBe(false);
    });

    it('should toggle isSearchFormVisible property when showSearchForm', function () {
        scope.showSelectedSection(scope.KEYWORD_SEARCH_SECTION);
        expect(scope.isSearchFormVisible).toBe(true);
        scope.showSelectedSection(scope.KEYWORD_SEARCH_SECTION);
        expect(scope.isSearchFormVisible).toBe(false);
    });

    it('should set to false isSearchFormVisible when showRouteForm', function () {
        scope.showSelectedSection(scope.ROUTE_SEARCH_SECTION);
        expect(scope.isSearchFormVisible).toBe(false);
    });

    it('should toggle isRouteFormVisible property when showRouteForm', function () {
        scope.showSelectedSection(scope.ROUTE_SEARCH_SECTION);
        expect(scope.isRouteFormVisible).toBe(true);
        scope.showSelectedSection(scope.ROUTE_SEARCH_SECTION);
        expect(scope.isRouteFormVisible).toBe(false);
    });
});

