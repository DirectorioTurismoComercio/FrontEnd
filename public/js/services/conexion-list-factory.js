(function(){
	angular.module('gemStore')
	.factory("ConexionListFactory",['$resource', 'Constantes',
		function($resource, Constantes){
			var obj = $resource(Constantes.url+"/usuario/:id_user/conversaciones");			
			return obj;			
		}]);
})();