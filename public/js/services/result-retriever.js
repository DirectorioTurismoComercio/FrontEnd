(function(){
	angular.module('gemStore')
	.factory('ResultRetriever', ['$q','$timeout', 'SuggestionsFactory','SuggestedTagsFactory',
		function($q,$timeout,SuggestionsFactory,SuggestedTagsFactory) {
		  var ResultRetriever = new Object();
		  ResultRetriever.getresults = function(token, suggestionsFactory, municipalityID) {
		    var resultdata = $q.defer();
		    var results;
              var request;
		      if(suggestionsFactory=="SuggestionsFactory")

                if(municipalityID){
                    request=SuggestionsFactory.query({token: token, municipio_id: municipalityID}).$promise;
                }else{
                    request=SuggestionsFactory.query({token: token}).$promise;
                }


              request.then(
		      function(results)
		      {
		      		  $timeout(function(){
				      resultdata.resolve(results);
				    },1000);
		      }
		      )
		      .catch(function(errors){
                console.log("Error al recuperar sugerencias desde el servidor: ",errors);
	            })
		      .finally(function(){
	               
	            });


		    return resultdata.promise
		  }

		  return ResultRetriever;
	}]);
})();


