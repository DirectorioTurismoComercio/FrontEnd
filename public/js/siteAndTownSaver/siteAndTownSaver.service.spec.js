describe('siteAndTownSaver Service', function () {

    var siteAndTownSaverService;

    var searchedQuery = {
        query: 'Hotel',
        town: 'Cundinamarca'
    };

    var  searchedRoute = {
        origin: 'Bogota',
        destination: 'Chia'
    };

    beforeEach(module('gemStore'));
    beforeEach(module('siteAndTownSaver'));
    beforeEach(inject(function ($injector) {

        siteAndTownSaverService = $injector.get('siteAndTownSaverService');

    }));

    it('should set and get current searched site', function () {
        var currentSearchedSite='local';
        siteAndTownSaverService.setCurrentSearchedSite(currentSearchedSite);
        expect(siteAndTownSaverService.getCurrentSearchedSite()).toBe('local');
    });

    it('should set and get current town', function () {
        var currentSearchedTown='Bogota';
        siteAndTownSaverService.setCurrentSearchedTown(currentSearchedTown);
        expect(siteAndTownSaverService.getCurrentSearchedTown()).toBe('Bogota');
    });

    it('should set and get current origin', function () {
        var currentOrigin='Bogota';
        siteAndTownSaverService.setOrigin(currentOrigin);
        expect(siteAndTownSaverService.getOrigin()).toBe('Bogota');
    });

    it('should set and get current destination', function () {
        var currentDestination='Tobia';
        siteAndTownSaverService.setDestination(currentDestination);
        expect(siteAndTownSaverService.getDestination()).toBe('Tobia');
    });

    it('should set and get current origin place name', function () {
        var currentOriginPlaceName='Tenjo';
        siteAndTownSaverService.setCurrentOriginPlaceName(currentOriginPlaceName);
        expect(siteAndTownSaverService.getCurrentOriginPlaceName()).toBe('Tenjo');
    });

    it('should set and get current destination place name', function () {
        var currentDestinationPlaceName='Chía';
        siteAndTownSaverService.setCurrentDestinationPlaceName(currentDestinationPlaceName);
        expect(siteAndTownSaverService.getCurrentDestinationPlaceName()).toBe('Chía');
    });

    it('should set and get Searched query', function () {
        siteAndTownSaverService.setSearchedQuery(searchedQuery.query, searchedQuery.town);
        var receivedSearchedQuery=siteAndTownSaverService.getSearchedQuery();
        expect(receivedSearchedQuery.query).toBe('Hotel');
        expect(receivedSearchedQuery.town).toBe('Cundinamarca');
    });

    it('should set and get Searched Route', function () {
        siteAndTownSaverService.setSearchedRoute(searchedRoute.origin, searchedRoute.destination);
        var receivedSearchedRoute=siteAndTownSaverService.getSearchedRoute();
        expect(receivedSearchedRoute.origin).toBe('Bogota');
        expect(receivedSearchedRoute.destination).toBe('Chia');
    });

    it('should reset search and route parameters', function () {
        var currentSearchedSite='local';
        var currentSearchedTown='Bogota';
        var currentOrigin='Bogota';
        var currentDestination='Tobia';
        siteAndTownSaverService.setCurrentSearchedSite(currentSearchedSite);
        siteAndTownSaverService.setCurrentSearchedTown(currentSearchedTown);
        siteAndTownSaverService.setOrigin(currentOrigin);
        siteAndTownSaverService.setDestination(currentDestination);
        siteAndTownSaverService.resetSearchAndRoute();
        expect(siteAndTownSaverService.getCurrentSearchedSite()).toBe(undefined);
        expect(siteAndTownSaverService.getCurrentSearchedTown()).toBe(undefined);
        expect(siteAndTownSaverService.getOrigin()).toBe(undefined);
        expect(siteAndTownSaverService.getDestination()).toBe(undefined);
    });

    it('should reset Searched Query and route', function () {
        siteAndTownSaverService.setSearchedQuery('query','town');
        siteAndTownSaverService.setSearchedRoute('query','town');
        siteAndTownSaverService.resetSearch();
        expect(siteAndTownSaverService.getSearchedQuery()).toBe(undefined);
        expect(siteAndTownSaverService.getSearchedRoute()).toBe(undefined);
    });
});