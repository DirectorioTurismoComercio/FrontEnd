angular.module('gemStore')
.factory('LogoutFactory', ['$resource','Constantes',
	function($resource, Constantes){						
		return {
	    	logear: function (token) {	    		
	        	return $resource(Constantes.url+'/rest-auth/logout', {}, {
		    	    save: {
		        	    method: 'POST',
		                headers: {
		                    'Authorization': 'Token ' + token		        
		                }
		            }
		        })
		    }
	}}
]);