(function(){
	angular.module('gemStore')
	.factory('SearchForResultsFactory', ['$resource', 'Constantes',function($resource,Constantes) {
		return $resource(Constantes.url+'/buscar',{token: '@token'});
	}]);
})();