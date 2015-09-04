/**
* gemStore Module
*
* Factory to access REST problems in server
*/
angular.module('gemStore')
.factory('SolutionFactory', ['$resource','Constantes',
	function($resource, Constantes){
		return $resource(Constantes.url+'/buscar');		
	}
]);