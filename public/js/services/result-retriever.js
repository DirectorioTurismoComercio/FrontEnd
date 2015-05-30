(function(){
	angular.module('gemStore')
	.factory('ResultRetriever', ['$resource', 'Constantes','$q','$timeout', 'SuggestionsFactory',
		function($resource,Constantes,$q,$timeout,SuggestionsFactory) {
		  var ResultRetriever = new Object();

		  ResultRetriever.getresults = function(i) {
		    var resultdata = $q.defer();
		    var results;

		    var someResults = ["1 The Wolverine", "The Smurfs 2", "The Mortal Instruments: City of Bones", "Drinking Buddies", "All the Boys Love Mandy Lane", "The Act Of Killing", "Red 2", "Jobs", "Getaway", "Red Obsession", "2 Guns", "The World's End", "Planes", "Paranoia", "The To Do List", "Man of Steel"];

		    var moreResults; // = ["crear página web","crear aplicación web", "crear aplicación aplicación móvil", "necesito desarrollador","crear sitio en internet","paginas internet"];
		      
		      SuggestionsFactory.query({token: i},
		      function(data)
		      {
		      	console.log(data);
		        moreResults=data;
		            if(i && i.indexOf('T')!=-1)
		      results=someResults;
		    else
		      results=moreResults;

		  console.log("more results"+moreResults);

		    $timeout(function(){
		      resultdata.resolve(results);
		    },1000);
		      }



        );


		    return resultdata.promise
		  }

		  return ResultRetriever;
	}]);
})();


