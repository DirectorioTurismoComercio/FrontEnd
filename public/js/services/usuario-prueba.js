angular.module('gemStore')
.factory('UserByToken', ['$resource','Constantes',
	function($resource, Constantes){						
		return {
	    	getUser: function (token) {	    		
	        	return $resource(Constantes.url+'/usuario', {}, {
		    	    query: {
		        	    method: 'GET',
		                headers: {
		                    'Authorization': 'Token ' + token		        
		                }
		            }
		        })
		    },

		    putUser: function (token) {	    		
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