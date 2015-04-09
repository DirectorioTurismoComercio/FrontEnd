(function(){
	angular.module('gemStore')
	.service('registroService', ['$resource', '$location',function($resource,$location) {
		var usuario = {nombres:"juan",
						apellido1:"",
						apellido2:"",
						numero_documento:"",
						correo:"", 
						nombre_institucion: "", 
					    telefono_institucion: "", 
					    ubicacion_institucion: "", 
					    direccion_institucion: "", 
					    correo_institucion: "", 
					    NIT: "", 
					    rol: 1, 


					};
		
        var changeView = function(view){
			$location.path(view);
		};
		  var getUsuario = function(){
		      return usuario;
		  }

	  return {
	    changeView: changeView,
	    getUsuario: getUsuario
	  };

	}]);
})();