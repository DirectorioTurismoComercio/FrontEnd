(function(){
	angular.module('gemStore')
	.factory('SuggestedTagsFactory', ['$resource', 'API_CONFIG',function($resource,API_CONFIG) {
		return $resource(API_CONFIG.url+'/sugerencias_tags',{token: '@token'});
	}]);
})();