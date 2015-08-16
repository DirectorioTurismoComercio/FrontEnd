(function(){
	angular.module('gemStore')
	.factory('SuggestionsFactory', ['$resource', 'Constantes',function($resource,Constantes) {
		return $resource(Constantes.url+'/sugerencias',{token: '@token'});
	}]);
})();