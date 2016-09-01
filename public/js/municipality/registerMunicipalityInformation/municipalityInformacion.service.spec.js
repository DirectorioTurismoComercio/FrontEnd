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
        expect(municipalityInformationService.getMunicipalityPhoneNumber()).toBe('1234');
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

    it('should set and get municipality address', function () {
        var address='st. 123';
        municipalityInformationService.setMunicipalityAddress(address);
        expect(municipalityInformationService.getMunicipalityAddress()).toBe('st. 123');
    });

    it('should set and get municipality location', function () {
        var location='4.345';
        municipalityInformationService.setMunicipalityLocation(location);
        expect(municipalityInformationService.getMunicipalityLocation()).toBe('4.345');
    });

    it('should set and get municipality main photo', function () {
        var mainPhoto=['1','2'];
        municipalityInformationService.setMunicipalityMainPhoto(mainPhoto);
        expect(municipalityInformationService.getMunicipalityMainPhoto()).toBe(mainPhoto);
    });

    it('should set and get municipality coat arm photo', function () {
        var coatArmPhotos=['1','2'];
        municipalityInformationService.setMunicipalityCoatArmsPhoto(coatArmPhotos);
        expect(municipalityInformationService.getMunicipalityCoatArmsPhoto()).toBe(coatArmPhotos);
    });

    it('should set and get municipality facade photo', function () {
        var facadePhotos=['1','2'];
        municipalityInformationService.setMunicipalityFacadePhotos(facadePhotos);
        expect(municipalityInformationService.getMunicipalityFacadePhotos()).toBe(facadePhotos);
    });

    it('should set and get municipality facade photo', function () {
        var URLphotos=['1','2'];
        municipalityInformationService.setMunicipalityURLPhotos(URLphotos);
        expect(municipalityInformationService.getMunicipalityURLPhotos()).toBe(URLphotos);
    });

    it('should set and get municipality id', function () {
        var id=1;
        municipalityInformationService.setMunicipalityId(id);
        expect(municipalityInformationService.getMunicipalityId()).toBe(1);
    });

    it('should set every field to original status when reset data', function () {
        var selectedMunicipality='chia';
        var phoneNumber='1234';
        var whatsapp='1234';
        var web='1234.com';
        var description='bla bla';
        var hours='10am - 10pm';
        var address='st. 123';
        var location='4.345';
        var mainPhoto=['1','2'];
        var coatArmPhotos=['1','2'];
        var facadePhotos=['1','2'];
        var URLphotos=['1','2'];
        var id=1;


        municipalityInformationService.setMunicipalitySelected(selectedMunicipality);
        municipalityInformationService.setMunicipalityPhoneNumber(phoneNumber);
        municipalityInformationService.setMunicipalityWhatsapp(whatsapp);
        municipalityInformationService.setMunicipalityWeb(web);
        municipalityInformationService.setMunicipalityDescription(description);
        municipalityInformationService.setMunicipalityOpeningHours(hours);
        municipalityInformationService.setMunicipalityAddress(address);
        municipalityInformationService.setMunicipalityLocation(location);
        municipalityInformationService.setMunicipalityMainPhoto(mainPhoto);
        municipalityInformationService.setMunicipalityCoatArmsPhoto(coatArmPhotos);
        municipalityInformationService.setMunicipalityFacadePhotos(facadePhotos);
        municipalityInformationService.setMunicipalityURLPhotos(URLphotos);
        municipalityInformationService.setMunicipalityId(id);

        municipalityInformationService.resetData();
        expect(municipalityInformationService.getMunicipalitySelected()).toBe(undefined);
        expect(municipalityInformationService.getMunicipalityPhoneNumber()).toBe(undefined);
        expect(municipalityInformationService.getMunicipalityWhatsapp()).toBe(undefined);
        expect(municipalityInformationService.getMunicipalityWeb()).toBe(undefined);
        expect(municipalityInformationService.getMunicipalityDescription()).toBe(undefined);
        expect(municipalityInformationService.getMunicipalityAddress()).toBe(undefined);
        //expect(municipalityInformationService.getMunicipalityMainPhoto()).toBe([]);
        //expect(municipalityInformationService.getMunicipalityCoatArmsPhoto()).toBe([]);
        //expect(municipalityInformationService.getMunicipalityFacadePhotos()).toBe([]);
        expect(municipalityInformationService.getMunicipalityURLPhotos()).toBe(undefined);
        expect(municipalityInformationService.getMunicipalityId()).toBe(undefined);

    });

});