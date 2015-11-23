/**
* gemStore Module
*
* Factory Autenticación
*/
angular.module('gemStore')
.factory('authFactory', ['$resource', function($resource){		
		function add_auth_header(data, headersGetter){            
            var headers = headersGetter();
            headers['Authorization'] = ('Basic ' + btoa(data.username +
                                        ':' + data.password));
        }
		return {
            auth: $resource('/auth\\/', {}, {
                login: {method: 'POST', transformRequest: add_auth_header},
                logout: {method: 'DELETE'}
            })
        };
	}
]);