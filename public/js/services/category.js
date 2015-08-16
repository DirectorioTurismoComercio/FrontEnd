/**
* gemStore Module
*
* Factory to access REST problems in server
*/
angular.module('gemStore')
.factory('CategoryFactory', ['$resource','Constantes',
	function($resource, Constantes){
		console.log("Constantes.url",Constantes.url);
		// http://www.epsilondx.com/django/index.fcgi/categorias?nivel=1
		// template /path/:verb
		// parameter {verb:'greet', salutation:'Hello'}
		// URL /path/greet?salutation=Hello
		
		// this allows me to add parameters from query
		return $resource(Constantes.url+'/categorias');
		// ,		{categorias:'categorias', nivel:'1'});
	}
]);
