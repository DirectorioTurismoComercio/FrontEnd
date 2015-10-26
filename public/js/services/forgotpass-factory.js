/**
* gemStore Module
*
* Factory to access REST problems in server
*/
angular.module('gemStore')
.factory('ForgotPassFactory', ['$resource','Constantes',
	function($resource, Constantes){		
		// return $resource(Constantes.url+'/afinidad/detalle',{cuestionario: '@cuestionario',id_ps: '@id_ps'});		
		return $resource(Constantes.url+'/rest-auth/confirm/password/reset');

	}
]);