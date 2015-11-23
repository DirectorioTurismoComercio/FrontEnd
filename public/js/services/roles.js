(function(){
	angular.module('gemStore')
	.factory("RoleFactory",['$resource', 'Constantes',
		function($resource, Constantes){
			// var obj = $resource(Constantes.url+"/roles/:id/");
			var obj = $resource(Constantes.url+"/roles?tipo_rol=:tipo_rol");
			// debugger;
			return obj;
			// return $resource("/productos/:id/");
		}]);
})();