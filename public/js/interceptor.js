angular.module('interceptor', [])
.factory('interceptorFactory', function($location,$injector,$q,$rootScope) {  
  var numLoadings = 0;
    var responseInterceptor = {
        responseError: function(response) {
      
        if (!(--numLoadings)) {
              $rootScope.$broadcast("loader_hide");
        }  
   			if(response.status==403){
   			var auth = $injector.get("$auth");
   			auth.removeToken();   
         	$location.path("/");
   			}
   			return $q.reject(response);
        },
        request: function (config) {
            
            
            if(config.url.indexOf("sugerencias") === -1){
            numLoadings++;  
            $rootScope.$broadcast("loader_show");
            }
            
            return config || $q.when(config)


        },
        response: function (response) {
            if ((--numLoadings) === 0) {
                
                $rootScope.$broadcast("loader_hide");
            }
            return response || $q.when(response);

        },
    };

    return responseInterceptor;
});

angular.module('interceptor').config(['$httpProvider',function($httpProvider) {
  $httpProvider.interceptors.push('interceptorFactory');
}]);