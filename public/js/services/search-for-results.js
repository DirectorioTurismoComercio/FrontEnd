
(function(){
	angular.module('gemStore')
		.factory('SearchForResultsFactory', ['$resource', 'API_CONFIG',function($resource,API_CONFIG) {
			return $resource(API_CONFIG.url+'/buscar',{search: '@search'});
		}]);
})();