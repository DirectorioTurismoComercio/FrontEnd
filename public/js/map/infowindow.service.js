'use strict';

angular.module('map')
	.service('InfoWindowService', function(){
            var getTemplate=function(nombre,descripcion,urlImage){
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


