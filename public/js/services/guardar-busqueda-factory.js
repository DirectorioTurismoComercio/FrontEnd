(function(){
	angular.module('gemStore')
	.factory("GuardarBusquedaFactory",['$resource', 'Constantes',
		function($resource, Constantes){
			var obj = $resource(Constantes.url+"/usuario/:pk/busquedas");			
			return obj;			
		}]);
})();