'use strict';

angular.module('map')
    .service('SiteMarkerService', function ($filter, $sce, $templateRequest, $q) {
        var markers = [];
        var selectedMarker = null;

        function markerOnClick(site, showSiteDetail) {
            return function () {
                showSiteDetail(site, null);
                highLightMarker(this);
            };
        }

        var addSiteMarker = function (site, marker, showSiteDetail) {
            marker.addListener('click', markerOnClick(site, showSiteDetail));

            markers.push(marker);
        };

        var deleteMarkers = function () {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
            markers = [];
        };

        var clearHighLightedMarkerByIndex = function (index) {
            clearHighLightedMarker(markers[index]);

        };

        var clearSelectedMarker = function () {
            if (selectedMarker) {
                clearHighLightedMarker(selectedMarker);
            }
        };

        var highLightMarkerByIndex = function (index) {
            highLightMarker(markers[index]);
        };

        function clearHighLightedMarker(marker) {
            setMarkerIcon(marker, marker.normalIcon);
        }

        function highLightMarker(marker) {
            clearSelectedMarker();
            selectedMarker = marker;
            setMarkerIcon(marker, marker.lightedIcon);
        }

        function setMarkerIcon(marker, iconUrl) {
            if (marker != undefined) {
                marker.setIcon(iconUrl);
            }
        }

        return {
            addSiteMarker: addSiteMarker,
            deleteMarkers: deleteMarkers,
            clearHighLightedMarkerByIndex: clearHighLightedMarkerByIndex,
            clearSelectedMarker: clearSelectedMarker,
            highLightMarkerByIndex: highLightMarkerByIndex
        };
    })
;


