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

	  return {
	    changeView: changeView,
	    getUsuario: getUsuario,
	    getUsuarioRedes: getUsuarioRedes
	  };

	}]);
})();