'use strict';

angular.module('map')
    .service('SiteMarkerService', function ($filter, $sce, $templateRequest, $q) {
        function showSiteInList(map, site) {
            return function () {
                console.log("show site selected " + site.nombre)
            };
        }


        var createSiteMarker = function (site, marker, map) {
            marker.addListener('click', showSiteInList(map, site));
        }

        return {
            createSiteMarker: createSiteMarker
        };
    })
;


