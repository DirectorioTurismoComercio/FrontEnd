describe('municipalityInformationService', function () {

    var municipalityInformationService;

    beforeEach(module('gemStore'));
    beforeEach(module('Municipality'));
    beforeEach(inject(function ($injector) {

        municipalityInformationService = $injector.get('municipalityInformationService');

    }));

    it('should set and get selected municipality', function () {
        var selectedMunicipality='chia';
        municipalityInformationService.setMunicipalitySelected(selectedMunicipality);
        expect(municipalityInformationService.getMunicipalitySelected()).toBe('chia');
    });

    it('should set and get municipality phone number', function () {
        var phoneNumber='1234';
        municipalityInformationService.setMunicipalityPhoneNumber(phoneNumber);
        expect(municipalityInformationService.getsetMunicipalityPhoneNumber()).toBe('1234');
    });

    it('should set and get municipality whatsup', function () {
        var whatsapp='1234';
        municipalityInformationService.setMunicipalityWhatsapp(whatsapp);
        expect(municipalityInformationService.getMunicipalityWhatsapp()).toBe('1234');
    });

    it('should set and get municipality web', function () {
        var web='1234.com';
        municipalityInformationService.setMunicipalityWeb(web);
        expect(municipalityInformationService.getMunicipalityWeb()).toBe('1234.com');
    });

    it('should set and get municipality description', function () {
        var description='bla bla';
        municipalityInformationService.setMunicipalityDescription(description);
        expect(municipalityInformationService.getMunicipalityDescription()).toBe('bla bla');
    });

    it('should set and get municipality opening hours', function () {
        var hours='10am - 10pm';
        municipalityInformationService.setMunicipalityOpeningHours(hours);
        expect(municipalityInformationService.getMunicipalityOpeningHours()).toBe('10am - 10pm');
    });

});