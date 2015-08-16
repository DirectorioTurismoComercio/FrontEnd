(function(){
	angular.module('gemStore')
	.factory("UserFactory",['$resource', 'Constantes',
		function($resource, Constantes){
			return $resource(Constantes.url+"/usuarios/:id",{id:'@id'},{update : { method : "PUT"}});
		}]);
})();