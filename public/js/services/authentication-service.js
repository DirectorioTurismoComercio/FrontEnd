/*
* gemStore Module
*/
angular.module('gemStore')
.factory('AuthFactory', ['$resource','Constantes',
	function($resource, Constantes){						
		return $resource(Constantes.url+'/rest-auth/login');
	}
]);