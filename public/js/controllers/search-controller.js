(function(){
  angular.module('gemStore')
  .controller('SearchController',
        ['$scope','ResultRetriever','SearchForResultsFactory',
    function SearchController($scope, ResultRetriever,SearchForResultsFactory) 
    {
    $scope.results = ResultRetriever.getresults("...");
    $scope.serverResults = ["uno","dos","tres"];
    $scope.results.then(function(data){
      $scope.results = data;
    });

    $scope.getresults = function(){
      return $scope.results;
    }

    $scope.doSomething = function(typedthings){
      console.log("Do something like reload data with this: " + typedthings );
      $scope.newresults = ResultRetriever.getresults(typedthings);
      $scope.newresults.then(function(data){
        $scope.results = data;
      });
    }
    $scope.search =  function (result)
    {
      SearchForResultsFactory.query({search: result},
      function(data)
      {
        console.log("RETORNO",data);
        $scope.serverResults=data;
      }


        );
     
    }

    $scope.doSomethingElse = function(suggestion){
      SearchForResultsFactory.query({search: suggestion},
      function(data)
      {
        $scope.serverResults=data;
      }


        );
     
      console.log("Suggestion selected: " + suggestion );
    }
    }

    ]);

    var gem = {name:"andres"};
})();




