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
            markers=[];
            console.log('delete markers',markers);
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
            console.log('markers',markers);
            highLightMarker(markers[index]);
        };

        function clearHighLightedMarker(marker) {
            setMarkerIcon(marker, './images/redMarker.png');
        }

        function highLightMarker(marker) {
            clearSelectedMarker();
            selectedMarker = marker;
            setMarkerIcon(marker, './images/greenMarker.png');
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


