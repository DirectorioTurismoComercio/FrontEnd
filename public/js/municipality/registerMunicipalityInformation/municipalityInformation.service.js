'use strict';

angular.module('Municipality')
    .factory('municipalityInformationService', function () {
        var municipalitySelected = undefined;
        var municipalityPhoneNumber = undefined;
        var municipalityWhatsapp = undefined;
        var municipalityWeb = undefined;
        var municipalityDescription = undefined;
        var municipalityOpeningHours = undefined;
        var municipalityAddress = undefined;
        var municipalityLocation=undefined;
        var municipalityMainPhoto=[];
        var municipalityCoatArmsPhoto=[];
        var municipalityFacadePhotos=[];
        var municiplaityURLPhotos=undefined;


        return {
            setMunicipalitySelected: setMunicipalitySelected,
            getMunicipalitySelected: getMunicipalitySelected,

            setMunicipalityPhoneNumber:setMunicipalityPhoneNumber,
            getMunicipalityPhoneNumber:getMunicipalityPhoneNumber,

            setMunicipalityWhatsapp:setMunicipalityWhatsapp,
            getMunicipalityWhatsapp:getMunicipalityWhatsapp,

            setMunicipalityWeb:setMunicipalityWeb,
            getMunicipalityWeb:getMunicipalityWeb,

            setMunicipalityDescription:setMunicipalityDescription,
            getMunicipalityDescription:getMunicipalityDescription,

            setMunicipalityOpeningHours:setMunicipalityOpeningHours,
            getMunicipalityOpeningHours:getMunicipalityOpeningHours,

            setMunicipalityAddress:setMunicipalityAddress,
            getMunicipalityAddress:getMunicipalityAddress,

            setMunicipalityLocation:setMunicipalityLocation,
            getMunicipalityLocation:getMunicipalityLocation,

            setMunicipalityMainPhoto:setMunicipalityMainPhoto,
            getMunicipalityMainPhoto:getMunicipalityMainPhoto,

            setMunicipalityCoatArmsPhoto:setMunicipalityCoatArmsPhoto,
            getMunicipalityCoatArmsPhoto:getMunicipalityCoatArmsPhoto,

            setMunicipalityFacadePhotos:setMunicipalityFacadePhotos,
            getMunicipalityFacadePhotos:getMunicipalityFacadePhotos,

            setMunicipalityURLPhotos:setMunicipalityURLPhotos,
            getMunicipalityURLPhotos:getMunicipalityURLPhotos
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

        function getMunicipalityPhoneNumber(){
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

        function setMunicipalityAddress(address){
            municipalityAddress=address;
        }

        function getMunicipalityAddress(){
            return municipalityAddress;
        }

        function setMunicipalityLocation(location){
            municipalityLocation=location;
        }

        function getMunicipalityLocation(){
            return municipalityLocation;
        }

        function setMunicipalityMainPhoto(mainPhoto){
            municipalityMainPhoto=mainPhoto;
        }

        function getMunicipalityMainPhoto(){
            return municipalityMainPhoto;
        }

        function setMunicipalityCoatArmsPhoto(coatArmsPhoto){
            municipalityCoatArmsPhoto=coatArmsPhoto;
        }

        function getMunicipalityCoatArmsPhoto(){
            return municipalityCoatArmsPhoto;
        }

        function setMunicipalityFacadePhotos(facadePhotos){
            municipalityFacadePhotos=facadePhotos;
        }

        function getMunicipalityFacadePhotos(){
            return municipalityFacadePhotos;
        }

        function setMunicipalityURLPhotos(URLPhotos){
            municiplaityURLPhotos=URLPhotos;
        }

        function getMunicipalityURLPhotos(){
            return municiplaityURLPhotos;
        }

    });