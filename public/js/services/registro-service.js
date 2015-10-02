(function(){
	angular.module('gemStore')
	.service('registroService', ['$resource', '$location','UserFactory',function($resource,$location,UserFactory) {
		var usuario = new UserFactory();
		var usuarioredes = new Array();
        var changeView = function(view){
			$location.path(view);
		};
		  var getUsuario = function(){
		      return usuario;
		  }
		  var getUsuarioRedes = function(){
		      return usuarioredes;
		  }
		  var setUsuario = function(_usuario){
		    /*  for (propiedad in _usuario)
                   { 
                    usuario[propiedad]=_usuario[propiedad];
                   }
                   */
                   usuario = _usuario;
		  }
		  var reset = function()
		  {
		  	usuario = new UserFactory();
		  	usuarioredes = new Array();
		  }

	  return {
	    changeView: changeView,
	    getUsuario: getUsuario,
	    getUsuarioRedes: getUsuarioRedes,
	    setUsuario: setUsuario,
	    reset: reset
	  };

	}]);
})();