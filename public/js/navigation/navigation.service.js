'use strict';

angular.module('navigation',[])
    .service('navigationService', function ($location) {
        var cameToBusinessInformationThrough=undefined;
        var municiplaityDetailNavigation=undefined;

        return {
            cameToBusinessInformationThrough:cameToBusinessInformationThrough,
            accountInfoRoute:accountInfoRoute,
            setMunicipalityDetailNavigation:setMunicipalityDetailNavigation,
            getMunicipalityDetailNavigation:getMunicipalityDetailNavigation
        };

        function accountInfoRoute(user){
            user.tipo_cuenta == "M" ? $location.path("/municipalityaccountinfo") : $location.path("/accountinfo");
        }

        function setMunicipalityDetailNavigation(navigationMode){
            municiplaityDetailNavigation=navigationMode;
        }

        function getMunicipalityDetailNavigation(){
            return municiplaityDetailNavigation;
        }

    });