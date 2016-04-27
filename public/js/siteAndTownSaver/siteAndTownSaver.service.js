'use strict';

angular.module('siteAndTownSaver', [])
    .service('siteAndTownSaverService', function () {
        var searchedQuery;
        var searchedRoute=undefined;
        var currentSearchedSite = undefined;
        var currentSearchedTown = undefined;
        var currentOrigin=undefined;
        var currentDestination=undefined;

        return {
            setCurrentSearchedSite: setCurrentSearchedSite,
            getCurrentSearchedSite: getCurrentSearchedSite,
            setCurrentSearchedTown: setCurrentSearchedTown,
            getCurrentSearchedTown: getCurrentSearchedTown,
            setOrigin:setOrigin,
            getOrigin:getOrigin,
            setDestination:setDestination,
            getDestination:getDestination,
            resetSearchAndRoute:resetSearchAndRoute,
            setSearchedQuery: setSearchedQuery,
            getSearchedQuery: getSearchedQuery,
            setSearchedRoute: setSearchedRoute,
            getSearchedRoute: getSearchedRoute,
            resetSearch: resetSearch

        }

        function setCurrentSearchedSite(site) {
            currentSearchedSite = site;
        }

        function getCurrentSearchedSite() {
            return currentSearchedSite;
        }

        function setCurrentSearchedTown(town) {
            currentSearchedTown = town;
        }

        function getCurrentSearchedTown() {
            return currentSearchedTown;
        }

        function setOrigin(origin){
            currentOrigin=origin;
        }

        function getOrigin(){
            return currentOrigin;
        }

        function setDestination(destination){
            currentDestination=destination;
        }

        function getDestination(){
            return currentDestination;
        }

        function resetSearchAndRoute(){
            currentSearchedSite=undefined;
            currentSearchedTown=undefined;
            currentOrigin=undefined;
            currentDestination=undefined;
        }

        function setSearchedQuery(query, town) {
            searchedQuery = {
                query: query,
                town: town
            };
        }

        function setSearchedRoute(origin, destination) {
            searchedRoute = {
                origin: origin,
                destination: destination
            };
        }

        function getSearchedQuery() {
            return searchedQuery;
        }

        function getSearchedRoute() {
            return searchedRoute;
        }

        function resetSearch() {
            searchedQuery = undefined;
            searchedRoute = undefined;
        }
    });