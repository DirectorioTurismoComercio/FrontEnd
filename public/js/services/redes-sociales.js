
(function(){
	angular.module('gemStore')
	.factory('RedFactory', ['$resource', 'Constantes',function($resource,Constantes) {
		return $resource(Constantes.url+'/redes/:id');
	}]);
})();