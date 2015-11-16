(function(){
	angular.module('gemStore')
	.factory("MunicipiosFactory",['$resource', 'Constantes',
		function($resource, Constantes){
			var obj = $resource(Constantes.url+"/municipios");			
			return obj;			
		}]);
})();