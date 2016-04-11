describe('siteAndTownSaver Service', function () {

    var siteAndTownSaverService;

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
});
