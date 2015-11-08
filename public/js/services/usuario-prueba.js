angular.module('gemStore')
.factory('UserByToken', ['$resource','Constantes',
	function($resource, Constantes){						
		return {
	    	us: function (token) {	    		
	        	return $resource(Constantes.url+'/usuario', {}, {
		    	    query: {
		        	    method: 'GET',
		                headers: {
		                    'Authorization': 'Token ' + token		        
		                }
		            }
		        })
		    },

		    up: function (token) {	    		
	        	return $resource(Constantes.url+'/usuario', {}, {
		    	    update: {
		        	    method: 'PUT',
		                headers: {
		                    'Authorization': 'Token ' + token		        
		                }
		            }
		        })
		    }
		};
	}
]);