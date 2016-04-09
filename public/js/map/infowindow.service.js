'use strict';

angular.module('map')
	.service('InfoWindowService', function($sce,$templateRequest){
            var getTemplate=function(nombre,descripcion,urlImage){
            var templateUrl = $sce.getTrustedResourceUrl('js/map/infowindow.html');  
            $templateRequest(templateUrl).then(function(template) {
            console.log(template);
        // template is the HTML template as a string

        // Let's put it into an HTML element and parse any directives and expressions
        // in the code. (Note: This is just an example, modifying the DOM from within
        // a controller is considered bad style.)
           }, function() {
        // An error has occurred
    });
              var infoWindowtemplate =  "<div>"+nombre+"</div>"+
                "<div>"+descripcion+"</div>"+
                "<img height=100 width=100 src='"+urlImage+"'></img>";
                return infoWindowtemplate;
            }

    

      return { 
              getTemplate: getTemplate
              };
	})
;


