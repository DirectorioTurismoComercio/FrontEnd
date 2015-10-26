angular.module('gemStore')
.factory('UserPrueba', ['$resource','Constantes',
	function($resource, Constantes){				
		// return $resource(Constantes.url+'/usuario',{}, {headers: { 'Authorization': 'anything' }});
		return {
	    	us: function (token) {
	    		console.log(token);
	        	return $resource(Constantes.url+'/usuario', {}, {
		    	    query: {
		        	    method: 'GET',
		                headers: {
		                    'Authorization': 'Token ' + token
		                    // 'Authorization': 'Token ' + '809f14dd7786c32fd3de06f9cbac1a9fab22631c'
		                }
		            }
		        })
		    }
		};
	}
]);