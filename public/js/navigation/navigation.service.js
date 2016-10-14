'use strict';

angular.module('navigation',[])
    .service('navigationService', function ($location) {
        var cameToBusinessInformationThrough=undefined;
        var municiplaityDetailNavigation=undefined;
        var clickedLogoButton=false;
        var cameToRecoveryPasswordThrough=false;

        return {
            cameToBusinessInformationThrough:cameToBusinessInformationThrough,
            cameToRecoveryPasswordThrough:cameToRecoveryPasswordThrough,
            accountInfoRoute:accountInfoRoute,
            setMunicipalityDetailNavigation:setMunicipalityDetailNavigation,
            getMunicipalityDetailNavigation:getMunicipalityDetailNavigation,
            setClickedLogoButton:setClickedLogoButton,
            hasClickedLogoButton:hasClickedLogoButton
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

        function setClickedLogoButton(value){
            clickedLogoButton=value;
        }

        function hasClickedLogoButton(){
            return clickedLogoButton;
        }

    });