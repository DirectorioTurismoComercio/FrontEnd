(function(){
	angular.module('gemStore')
	.factory("BusquedaSolucionFactory",['$resource', 'Constantes',
		function($resource, Constantes){
			var obj = $resource(Constantes.url+"/respuestas/busqueda");			
			return obj;			
		}]);
})();