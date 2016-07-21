'use strict';

angular.module('registerSite')
    .service('siteInformationService', function () {
        var siteId = undefined;
        var sitePhoneNumber = undefined;
        var whatsapp = undefined;
        var web = undefined;
        var openingHours = undefined;
        var businessName = undefined;
        var businessLocation = undefined;
        var businessDescription = undefined;
        var tags = undefined;
        var businessEmail = undefined;
        var businessAddress = undefined;
        var businessCategories = undefined;
        var businessMunicipality = undefined;
        var mainPhoto = [];
        var facadePhotos = [];
        var insidePhotos = [];
        var productsPhotos = [];
        var URLphotos = undefined;
        var businessFirstCategories=undefined;
        var businessSecondCategories=undefined;
        var businessThirdCategories=undefined;

        return {

            siteId: siteId,
            sitePhoneNumber: sitePhoneNumber,
            whatsapp: whatsapp,
            web: web,
            openingHours: openingHours,
            businessName: businessName,
            businessLocation: businessLocation,
            businessDescription: businessDescription,
            tags: tags,
            businessEmail: businessEmail,
            businessAddress: businessAddress,
            businessCategories: businessCategories,
            businessMunicipality: businessMunicipality,
            mainPhoto: mainPhoto,
            facadePhotos: facadePhotos,
            insidePhotos: insidePhotos,
            productsPhotos: productsPhotos,
            URLphotos: URLphotos,
            businessFirstCategories:businessFirstCategories,
            businessSecondCategories:businessSecondCategories,
            businessThirdCategories:businessThirdCategories, 
            clearData: function(siteInformationService){
                for(var property in siteInformationService) { 
                    if(siteInformationService.hasOwnProperty(property) && property!="clearData") {
                        siteInformationService[property]=undefined ; 
                        }
                }
            siteInformationService.mainPhoto=[];
            siteInformationService.facadePhotos=[];
            siteInformationService.insidePhotos=[];
            siteInformationService.productsPhotos=[];
            } 
        };


    });