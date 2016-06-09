'use strict';

angular.module('registerSite')
    .service('siteInformationService', function () {
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

        return {
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
            businessCategories:businessCategories
        };


    });