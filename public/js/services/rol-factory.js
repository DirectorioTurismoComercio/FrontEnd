(function(){
	angular.module('gemStore')
	.factory('RolFactory', ['$resource', 'Constantes',function($resource,Constantes) {
	return $resource(Constantes.url+'/roles/:id/');
	}]);
})();