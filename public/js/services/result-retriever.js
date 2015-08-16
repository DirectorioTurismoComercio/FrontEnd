(function(){
	angular.module('gemStore')
	.factory('ResultRetriever', ['$q','$timeout', 'SuggestionsFactory','SuggestedTagsFactory',
		function($q,$timeout,SuggestionsFactory,SuggestedTagsFactory) {
		  var ResultRetriever = new Object();

		  ResultRetriever.getresults = function(token, suggestionsFactory) {
		    var resultdata = $q.defer();
		    var results;

		      if(suggestionsFactory=="SuggestionsFactory")
		      SuggestionsFactory.query({token: token}).$promise.
		      then(
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
		       if(suggestionsFactory=="SuggestedTagsFactory")
		      SuggestedTagsFactory.query({token: token}).$promise.
		      then(
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


