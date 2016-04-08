(function(){
	angular.module('gemStore')
		.factory('SuggestionsFactory', ['$resource', 'API_CONFIG',function($resource,API_CONFIG) {
			return $resource(API_CONFIG.url+'/sugerencias',{token: '@token'});
		}]);
})();