'use strict';

angular.module('map')
    .service('SiteMarkerService', function ($filter, $sce, $templateRequest, $q) {
        var markers = [];
        var selectedMarker = null;
        function markerOnClick(site,showSiteDetail) {
            return function () {
                showSiteDetail(site, null);
                highLightMarker(this);
            };
        }

        var addSiteMarker = function (site, marker, map,showSiteDetail) {
            marker.addListener('click', markerOnClick(site,showSiteDetail));

            markers.push(marker);
        }

        var deleteMarkers = function() {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setGMap(null);
            }
        }

        var clearHighLightedMarkerByIndex = function(index){
            clearHighLightedMarker(markers[index]);
                
        }
        var clearSelectedMarker = function(){
            if(selectedMarker){
                clearHighLightedMarker(selectedMarker);
            }
        }
        var highLightMarkerByIndex = function(index){
            highLightMarker(markers[index]);
        }
        function clearHighLightedMarker(marker){
            marker.setIcon('./images/redMarker.png');
        }

        function highLightMarker(marker){
            clearSelectedMarker();
            selectedMarker = marker;
            marker.setIcon('./images/greenMarker.png');
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


