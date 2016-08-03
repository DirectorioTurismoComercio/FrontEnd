(function(){
	angular.module('gemStore')
	.factory("MunicipiosFactory",['$resource', 'API_CONFIG',
		function($resource, API_CONFIG){

			return{
				getTowns:getTowns
			};

			function getTowns(){
				var townsPromise = $resource(API_CONFIG.url+"/municipios").query().$promise;
				return townsPromise;
			}
		}]);
})();