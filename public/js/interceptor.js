angular.module('interceptor', [])
.factory('interceptorFactory', function($location,$injector,$q) {  
    var responseInterceptor = {
        responseError: function(response) {
   			if(response.status==403){
   			var auth = $injector.get("$auth");
   			auth.removeToken();   
         	$location.path("/");
   			}
   			return $q.reject(response);
        }
    };

    return responseInterceptor;
});

angular.module('interceptor').config(['$httpProvider',function($httpProvider) {
  $httpProvider.interceptors.push('interceptorFactory');
}]);