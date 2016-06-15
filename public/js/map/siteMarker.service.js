'use strict';

angular.module('map')
    .service('SiteMarkerService', function () {
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
            try {
                highLightMarker(markers[index]);
            } catch (err) {
                console.error(markers);
            }
        };

        function clearHighLightedMarker(marker) {
            if (marker) {
                setMarkerIcon(marker, marker.normalIcon);
            }
        }

        function highLightMarker(marker) {
            if (marker) {
                selectedMarker = marker;
                setMarkerIcon(marker, marker.lightedIcon);
            }
        }

        function setMarkerIcon(marker, iconUrl) {
            if (marker) {
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


