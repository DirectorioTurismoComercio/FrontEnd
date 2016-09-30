'use strict';

angular.module('map')
    .service('SiteMarkerService', function (MapService) {
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
            if (marker) {
                marker = addDestinationIconMarker(marker, "normal");
                setMarkerIcon(marker, marker.normalIcon);
                marker.zIndex = 1;
            }
        }

        function highLightMarker(marker) {
            clearSelectedMarker();

            if (marker) {
                selectedMarker = marker;
                marker = addDestinationIconMarker(marker, "lighted");
                setMarkerIcon(marker, marker.lightedIcon);
                marker.zIndex=10;
            }
        }

        function setMarkerIcon(marker, iconUrl) {
            if (marker) {
                marker.setIcon(iconUrl);
            }
        }

        function addDestinationIconMarker(marker, status) {
            if (status == "normal" && marker.normalIcon == undefined) {
                marker.normalIcon = MapService.createIcon('images/icons/llegada-mapa.png', 50);
            }
            if (status == "lighted" && marker.lightedIcon == undefined) {
                marker.lightedIcon = MapService.createIcon('images/icons/llegada-mapa.png', 50);
            }
            return marker;
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


