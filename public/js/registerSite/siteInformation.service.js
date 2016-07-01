'use strict';

angular.module('registerSite')
    .service('siteInformationService', function () {
        var siteId = undefined;
        var sitePhoneNumber = undefined;
        var whatsapp=undefined;
        var web=undefined;
        var openingHours=undefined;
        var businessName=undefined;
        var businessLocation=undefined;
        var businessDescription=undefined;
        var tags=undefined;
        var businessEmail=undefined;
        var businessAddress=undefined;
        var businessCategories = {
            category: ''
        };
        var businessMunicipality=undefined;
        var formData=undefined;

        return {
            siteId: siteId,
            sitePhoneNumber:sitePhoneNumber,
            whatsapp:whatsapp,
            web:web,
            openingHours:openingHours,
            businessName:businessName,
            businessLocation:businessLocation,
            businessDescription:businessDescription,
            tags:tags,
            businessEmail:businessEmail,
            businessAddress:businessAddress,
            businessCategories:businessCategories,
            businessMunicipality:businessMunicipality,
            formData:formData
        };


    });