'use strict';

angular.module('siteAndTownSaver',[])
    .service('siteAndTownSaverService', function () {

        var currentSearchedSite;
        var currentSearchedTown;

        return {
            setCurrentSearchedSite: setCurrentSearchedSite,
            getCurrentSearchedSite: getCurrentSearchedSite,
            setCurrentSearchedTown:setCurrentSearchedTown,
            getCurrentSearchedTown:getCurrentSearchedTown
        }

        function setCurrentSearchedSite(site){
            currentSearchedSite=site;
        }

        function getCurrentSearchedSite(){
            return currentSearchedSite;
        }

        function setCurrentSearchedTown(town){
            currentSearchedTown=town;
        }

        function getCurrentSearchedTown(){
            return currentSearchedTown;
        }
    });