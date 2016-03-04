describe('Register module', function () {

    var registerService, httpBackend, userFactory, API_CONFIG, registerResource, registerErrorHandler, mdDialog;
    var userData = {
            nombres: "nombre1",
            tags: [],
            apellido1: "apellido1",
            apellido1: "apellido2",
            numero_documento: null,
            correo: "correo@correo.com",
            password: "12345",
            nombre_institucion: null,
            telefono_institucion: null,
            ubicacion_institucion: "1234321",
            ubicacion_institucion: "Bogota",
            direccion_institucion: "Unal",
            correo_institucion: null,
            NIT: null,
            descripcion: null,
            municipio_id: 131,
            rol: 2,
            redes: []
        };

    beforeEach(module('gemStore'));
    beforeEach(module('register'));
    beforeEach(module('constants'));
    beforeEach(inject(function ($injector) {
        httpBackend = $injector.get('$httpBackend');

        registerService = $injector.get('registerService');

        userFactory = $injector.get('UserFactory');

        API_CONFIG=$injector.get('API_CONFIG');
        registerResource=$injector.get('registerResource');
        registerErrorHandler= $injector.get('registerErrorHandler');
        mdDialog= $injector.get('$mdDialog');

    }));

    it('should receive user data as parameter', function () {
        expect(registerService.register).toThrow();
    });

    it('should register user data ', function () {
        spyOn(registerResource, 'save').and.callFake(function () {
            return true;
        });
        expect(registerService.register(userData)).toBe(true);
    });

    it('should throws error if any of apellido1, municipio_id, rol, password field is undefined', function () {
        userData.apellido1=undefined;
        expect(function(){registerService.register(userData)}).toThrow();

        userData.municipio_id=undefined;
        expect(function(){registerService.register(userData)}).toThrow();

        userData.rol=undefined;
        expect(function(){registerService.register(userData)}).toThrow();

        userData.password=undefined;
        expect(function(){registerService.register(userData)}).toThrow();
    });

    it('should show message error if occurs error 400', function () {
        var error={
            status: 400
        };
        spyOn(mdDialog, 'show');
        registerErrorHandler.showError(error);
        expect(mdDialog.show).toHaveBeenCalled();
    });

});