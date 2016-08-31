'use strict';

angular.module('Municipality')
    .factory('municipalityInformationService', function () {
        var municipalitySelected = undefined;
        var municipalityPhoneNumber = undefined;
        var municipalityWhatsapp = undefined;
        var municipalityWeb = undefined;
        var municipalityDescription = undefined;
        var municipalityOpeningHours = undefined;

        return {
            setMunicipalitySelected: setMunicipalitySelected,
            getMunicipalitySelected: getMunicipalitySelected,

            setMunicipalityPhoneNumber:setMunicipalityPhoneNumber,
            getsetMunicipalityPhoneNumber:getsetMunicipalityPhoneNumber,

            setMunicipalityWhatsapp:setMunicipalityWhatsapp,
            getMunicipalityWhatsapp:getMunicipalityWhatsapp,

            setMunicipalityWeb:setMunicipalityWeb,
            getMunicipalityWeb:getMunicipalityWeb,

            setMunicipalityDescription:setMunicipalityDescription,
            getMunicipalityDescription:getMunicipalityDescription,

            setMunicipalityOpeningHours:setMunicipalityOpeningHours,
            getMunicipalityOpeningHours:getMunicipalityOpeningHours
        }

        function setMunicipalitySelected(municipality){
            municipalitySelected=municipality;
        }

        function getMunicipalitySelected(){
            return municipalitySelected;
        }

        function setMunicipalityPhoneNumber(phoneNumber){
            municipalityPhoneNumber=phoneNumber;
        }

        function getsetMunicipalityPhoneNumber(){
            return municipalityPhoneNumber;
        }

        function setMunicipalityWhatsapp(whatsapp){
            municipalityWhatsapp=whatsapp;
        }

        function getMunicipalityWhatsapp(){
            return municipalityWhatsapp;
        }

        function setMunicipalityWeb(web){
            municipalityWeb=web;
        }

        function getMunicipalityWeb(){
            return municipalityWeb;
        }

        function setMunicipalityDescription(description){
            municipalityDescription=description;
        }

        function getMunicipalityDescription(){
            return municipalityDescription;
        }

        function setMunicipalityOpeningHours(hours){
            municipalityOpeningHours=hours;
        }

        function getMunicipalityOpeningHours(){
            return municipalityOpeningHours;
        }

    });