(function(){
	angular.module('gemStore')
	.factory('UsuarioRedesFactory', ['$resource', 'Constantes',function($resource,Constantes) {
	return $resource(configuracion.url+'/usuarios/:idusuario/redes');
	}]);
})();