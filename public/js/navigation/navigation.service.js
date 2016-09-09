'use strict';

angular.module('navigation',[])
    .service('navigationService', function ($location) {
        var cameToBusinessInformationThrough=undefined;

        return {
            cameToBusinessInformationThrough:cameToBusinessInformationThrough,
            accountInfoRoute:accountInfoRoute
        };

        function accountInfoRoute(user){
            user.tipo_cuenta == "M" ? $location.path("/municipalityaccountinfo") : $location.path("/accountinfo");
        }


    });