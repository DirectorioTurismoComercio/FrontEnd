(function(){
	angular.module('gemStore')
	factory('UsuarioRedesFactory', ['$resource', 'configuracion',function($resource,configuracion) {
	return $resource(configuracion.url+'/usuarios/:idusuario/redes');
	}]);
})();