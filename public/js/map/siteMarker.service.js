'use strict';

angular.module('map')
	.service('SiteMarkerService', function($filter,$sce,$templateRequest,$q){

        function makeInfoWindowEvent(map, marker, content) {  
           return function() {  
            var infowindow = new google.maps.InfoWindow({
                content: content
              });
              infowindow.open(map, marker);
           };  
        } 


    var createSiteMarker=function(site,marker,map){
            var templateUrl = $sce.getTrustedResourceUrl('js/map/infowindow.html');  
             
            $templateRequest(templateUrl).then(function(template) {
            var filter = $filter('format');
            var content = filter(template, site.nombre,site.descripcion,site.URLfoto);
            marker.addListener('click',makeInfoWindowEvent(map,marker,content));

             }, function() {
              console.log("error al crear template para Marker");
            });
            
          
    }   

    return { 
              createSiteMarker: createSiteMarker
          };
	})
;


