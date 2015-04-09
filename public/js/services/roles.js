(function(){
	angular.module('gemStore')
	.factory("RoleFactory",['$resource', 'Constantes',
		function($resource, Constantes){
			var obj = $resource(Constantes.url+"/roles/:id/");
			// debugger;
			return obj;
			// return $resource("/productos/:id/");
		}]);
})();