'use strict';

angular.module('siteAndTownSaver', [])
    .constant('KEYWORD_SEARCH_SECTION', '1')
    .constant('ROUTE_SEARCH_SECTION', '2')
    .service('siteAndTownSaverService', function () {
        var openSection = undefined;
        var searchedQuery;
        var currentSearchedSite = undefined;
        var currentSearchedTown = undefined;
        var currentOrigin = undefined;
        var currentDestination = undefined;
        var currentOriginPlaceName = undefined;
        var currentDestinationPlaceName = undefined;
        var searchedRoute = {
            origin: undefined,
            destination: undefined
        };
        var searchedKeyword = {
            keyword: undefined,
            town: undefined
        };
        var sectionData = {
            route: {},
            keyword: undefined
        };
        
        var selectedCategory=undefined;

        return {
            setCurrentSearchedSite: setCurrentSearchedSite,
            getCurrentSearchedSite: getCurrentSearchedSite,
            setCurrentSearchedTown: setCurrentSearchedTown,
            getCurrentSearchedTown: getCurrentSearchedTown,
            setOrigin: setOrigin,
            getOrigin: getOrigin,
            setDestination: setDestination,
            getDestination: getDestination,
            setCurrentOriginPlaceName: setCurrentOriginPlaceName,
            getCurrentOriginPlaceName: getCurrentOriginPlaceName,
            setCurrentDestinationPlaceName: setCurrentDestinationPlaceName,
            getCurrentDestinationPlaceName: getCurrentDestinationPlaceName,
            resetSearchAndRoute: resetSearchAndRoute,
            setSearchedQuery: setSearchedQuery,
            getSearchedQuery: getSearchedQuery,
            setSearchedRoute: setSearchedRoute,
            getSearchedRoute: getSearchedRoute,
            resetSearch: resetSearch,
            openSection: openSection,
            searchedRoute: searchedRoute,
            searchedKeyword: searchedKeyword,
            sectionData: sectionData,
            setSelectedCategory:setSelectedCategory,
            getSelectedCategory:getSelectedCategory
        };

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

        function setOrigin(origin) {
            currentOrigin = origin;
        }

        function getOrigin() {
            return currentOrigin;
        }

        function setDestination(destination) {
            currentDestination = destination;
        }

        function getDestination() {
            return currentDestination;
        }

        function setCurrentOriginPlaceName(name) {
            currentOriginPlaceName = name;
        }

        function getCurrentOriginPlaceName() {
            return currentOriginPlaceName;
        }

        function setCurrentDestinationPlaceName(name) {
            currentDestinationPlaceName = name;
        }

        function getCurrentDestinationPlaceName() {
            return currentDestinationPlaceName;
        }

        function resetSearchAndRoute() {
            currentSearchedSite = undefined;
            currentSearchedTown = undefined;
            currentOrigin = undefined;
            currentDestination = undefined;
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
        
        function setSelectedCategory(category){
            selectedCategory=category;
        }

        function getSelectedCategory(){
            return selectedCategory;
        }
        
    });