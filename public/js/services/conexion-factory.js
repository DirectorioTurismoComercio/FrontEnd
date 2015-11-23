(function(){
	angular.module('gemStore')
	.factory("ConexionFactory",['$resource', 'Constantes',
		function($resource, Constantes){
			var obj = $resource(Constantes.url+"/conversacion?busqueda_id=:id_b&respuesta_id=:id_s");			
			return obj;			
		}]);
})();