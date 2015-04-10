(function(){
	angular.module('gemStore')
	.factory('UsuarioRedesFactory', ['$resource', 'Constantes',function($resource,Constantes) {
	return $resource(Constantes.url+'/usuarios/:idusuario/redes');
	}]);
})();