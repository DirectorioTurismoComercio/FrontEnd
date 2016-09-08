'use strict';

angular.module('Municipality')
    .factory('municipalityInformationService', function (authenticationService, $http, API_CONFIG, $q, $timeout, serverConnectionService, $location) {
        var municipalitySelected = undefined;
        var municipalityPhoneNumber = undefined;
        var municipalityWhatsapp = undefined;
        var municipalityWeb = undefined;
        var municipalityDescription = undefined;
        var municipalityOpeningHours = undefined;
        var municipalityAddress = undefined;
        var municipalityLocation = undefined;
        var municipalityMainPhoto = [];
        var municipalityCoatArmsPhoto = [];
        var municipalityFacadePhotos = [];
        var municiplaityURLPhotos = undefined;
        var municipalityId = undefined;


        return {
            setMunicipalitySelected: setMunicipalitySelected,
            getMunicipalitySelected: getMunicipalitySelected,

            setMunicipalityPhoneNumber: setMunicipalityPhoneNumber,
            getMunicipalityPhoneNumber: getMunicipalityPhoneNumber,

            setMunicipalityWhatsapp: setMunicipalityWhatsapp,
            getMunicipalityWhatsapp: getMunicipalityWhatsapp,

            setMunicipalityWeb: setMunicipalityWeb,
            getMunicipalityWeb: getMunicipalityWeb,

            setMunicipalityDescription: setMunicipalityDescription,
            getMunicipalityDescription: getMunicipalityDescription,

            setMunicipalityOpeningHours: setMunicipalityOpeningHours,
            getMunicipalityOpeningHours: getMunicipalityOpeningHours,

            setMunicipalityAddress: setMunicipalityAddress,
            getMunicipalityAddress: getMunicipalityAddress,

            setMunicipalityLocation: setMunicipalityLocation,
            getMunicipalityLocation: getMunicipalityLocation,

            setMunicipalityMainPhoto: setMunicipalityMainPhoto,
            getMunicipalityMainPhoto: getMunicipalityMainPhoto,

            setMunicipalityCoatArmsPhoto: setMunicipalityCoatArmsPhoto,
            getMunicipalityCoatArmsPhoto: getMunicipalityCoatArmsPhoto,

            setMunicipalityFacadePhotos: setMunicipalityFacadePhotos,
            getMunicipalityFacadePhotos: getMunicipalityFacadePhotos,

            setMunicipalityURLPhotos: setMunicipalityURLPhotos,
            getMunicipalityURLPhotos: getMunicipalityURLPhotos,

            setMunicipalityId: setMunicipalityId,
            getMunicipalityId: getMunicipalityId,

            sendMunicipalityDataToServer: sendMunicipalityDataToServer,
            resetData: resetData
        }

        function setMunicipalitySelected(municipality) {
            municipalitySelected = municipality;
        }

        function getMunicipalitySelected() {
            return municipalitySelected;
        }

        function setMunicipalityPhoneNumber(phoneNumber) {
            municipalityPhoneNumber = phoneNumber;
        }

        function getMunicipalityPhoneNumber() {
            return municipalityPhoneNumber;
        }

        function setMunicipalityWhatsapp(whatsapp) {
            municipalityWhatsapp = whatsapp;
        }

        function getMunicipalityWhatsapp() {
            return municipalityWhatsapp;
        }

        function setMunicipalityWeb(web) {
            municipalityWeb = web;
        }

        function getMunicipalityWeb() {
            return municipalityWeb;
        }

        function setMunicipalityDescription(description) {
            municipalityDescription = description;
        }

        function getMunicipalityDescription() {
            return municipalityDescription;
        }

        function setMunicipalityOpeningHours(hours) {
            municipalityOpeningHours = hours;
        }

        function getMunicipalityOpeningHours() {
            return municipalityOpeningHours;
        }

        function setMunicipalityAddress(address) {
            municipalityAddress = address;
        }

        function getMunicipalityAddress() {
            return municipalityAddress;
        }

        function setMunicipalityLocation(location) {
            municipalityLocation = location;
        }

        function getMunicipalityLocation() {
            return municipalityLocation;
        }

        function setMunicipalityMainPhoto(mainPhoto) {
            municipalityMainPhoto = mainPhoto;
        }

        function getMunicipalityMainPhoto() {
            return municipalityMainPhoto;
        }

        function setMunicipalityCoatArmsPhoto(coatArmsPhoto) {
            municipalityCoatArmsPhoto = coatArmsPhoto;
        }

        function getMunicipalityCoatArmsPhoto() {
            return municipalityCoatArmsPhoto;
        }

        function setMunicipalityFacadePhotos(facadePhotos) {
            municipalityFacadePhotos = facadePhotos;
        }

        function getMunicipalityFacadePhotos() {
            return municipalityFacadePhotos;
        }

        function setMunicipalityURLPhotos(URLPhotos) {
            municiplaityURLPhotos = URLPhotos;
        }

        function getMunicipalityURLPhotos() {
            return municiplaityURLPhotos;
        }

        function setMunicipalityId(id) {
            municipalityId = id;
        }

        function getMunicipalityId() {
            return municipalityId;
        }

        function resetData() {
            municipalitySelected = undefined;
            municipalityPhoneNumber = undefined;
            municipalityWhatsapp = undefined;
            municipalityWeb = undefined;
            municipalityDescription = undefined;
            municipalityOpeningHours = undefined;
            municipalityAddress = undefined;
            municipalityLocation = undefined;
            municipalityMainPhoto = [];
            municipalityCoatArmsPhoto = [];
            municipalityFacadePhotos = [];
            municiplaityURLPhotos = undefined;
            municipalityId = undefined;
        }

        function sendMunicipalityDataToServer(successFunction, errorFunction) {
            var promise;


            var fd = buildMunicipalityFormData();

            if (municipalityId) {
                promise = $http.put(API_CONFIG.url + API_CONFIG.sitio + "/detail/" + municipalityId, fd,
                    {
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': undefined,
                            'Authorization': 'Token ' + authenticationService.getUser().token
                        }
                    });
            } else {
                promise = $http.post(API_CONFIG.url + API_CONFIG.sitio, fd,
                    {
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': undefined,
                            'Authorization': 'Token ' + authenticationService.getUser().token
                        }
                    })

            }

            promise.catch(function (e) {
                serverConnectionService.checkTimeOutError(e);
                $location.path('/home');
            });

            promise.success(successFunction).error(errorFunction);
        }

        function buildMunicipalityFormData() {
            var fd = new FormData();

            fd.append('latitud', municipalityLocation.lat);
            fd.append('longitud', municipalityLocation.lng);
            fd.append('nombre', municipalitySelected.nombre);
            fd.append('descripcion', municipalityDescription);
            fd.append('municipio_id', municipalitySelected.id);
            if (municipalityPhoneNumber) fd.append('telefono', municipalityPhoneNumber);
            if (municipalityOpeningHours) fd.append('horariolocal', municipalityOpeningHours);
            fd.append('ubicacionlocal', municipalityAddress);
            fd.append("categorias", JSON.stringify([]));
            fd.append('usuario', authenticationService.getUser().id);
            if (municipalityWeb) fd.append('web', municipalityWeb);
            if (municipalityWhatsapp) fd.append('whatsapp', municipalityWhatsapp);
            fd.append('tipo_sitio', 'M');

            appendPhotos(municipalityMainPhoto, 'fotos_PRINCIPAL', fd);
            appendPhotos(municipalityFacadePhotos, 'fotos_FACHADA', fd);
            appendPhotos(municipalityCoatArmsPhoto, 'fotos_INTERIOR', fd);
            return fd;
        }

        function appendPhotos(arrayPhotos, model, fd) {
            var photosCounter = 0;
            angular.forEach(arrayPhotos, function (file) {
                fd.append(model + photosCounter, file.file);
                photosCounter++;
            });
        }

    });