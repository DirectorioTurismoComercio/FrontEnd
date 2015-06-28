(function(){
	angular.module('gemStore')
	.factory('SuggestedTagsFactory', ['$resource', 'Constantes',function($resource,Constantes) {
		return $resource(Constantes.url+'/sugerencias_tags',{token: '@token'});
	}]);
})();