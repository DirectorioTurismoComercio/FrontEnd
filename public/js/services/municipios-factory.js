(function(){
	angular.module('gemStore')
	.factory("MunicipiosFactory",['$resource', 'Constantes',
		function($resource, Constantes){

			return{
				getTowns:getTowns
			};

			function getTowns(){
				var townsPromise = $resource(Constantes.url+"/municipios").query().$promise;
				return townsPromise;
			}
		}]);
})();