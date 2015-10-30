(function(){
	angular.module('gemStore')
	.factory("DetalleBusquedaFactory",['$resource', 'Constantes',
		function($resource, Constantes){
			var obj = $resource(Constantes.url+"/busqueda/:pk");			
			return obj;			
		}]);
})();