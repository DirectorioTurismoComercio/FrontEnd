'use strict';

angular.module('registerSite')
    .service('siteInformationService', function () {
        var sitePhoneNumber = undefined;
        var whatsapp=undefined;
        var openingHours=undefined;
        var businessName=undefined;
        var businessLocation=undefined;
        var businessDescription=undefined;
        var tags=undefined;
        var businessEmail=undefined;
        var businessAddress=undefined;

        return {
            sitePhoneNumber:sitePhoneNumber,
            whatsapp:whatsapp,
            openingHours:openingHours,
            businessName:businessName,
            businessLocation:businessLocation,
            businessDescription:businessDescription,
            tags:tags,
            businessEmail:businessEmail,
            businessAddress:businessAddress
        };


    });