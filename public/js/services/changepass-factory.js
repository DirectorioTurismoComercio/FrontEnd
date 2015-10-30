angular.module('gemStore')
.factory('changePassFactory', ['$resource','Constantes',
	function($resource, Constantes){						
		return {
	    	change_pass: function (token) {
	    		console.log(token);
	        	return $resource(Constantes.url+'/rest-auth/password/change', {}, {
		    	    save: {
		        	    method: 'POST',
		                headers: {
		                    'Authorization': 'Token ' + token		                    
		                }
		            }
		        })
		    }
		};
	}
]);