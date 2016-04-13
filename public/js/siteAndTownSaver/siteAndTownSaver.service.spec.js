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
});
