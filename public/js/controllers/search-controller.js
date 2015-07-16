(function(){
  angular.module('gemStore')
  .controller('SearchController',
        ['$scope','ResultRetriever','SearchForResultsFactory',
    function SearchController($scope, ResultRetriever,SearchForResultsFactory) 
    {
    $scope.results = ResultRetriever.getresults("...");
    $scope.serverResults = [];
    $scope.tipo="P";
    $scope.results.then(function(data){
      $scope.results = data;
    });

    $scope.getresults = function(){
      return $scope.results;
    }

    $scope.doSomething = function(typedthings){
      $scope.newresults = ResultRetriever.getresults(typedthings, 'SuggestionsFactory');
      $scope.newresults.then(function(data){
        $scope.results = data;
      });
    }
    $scope.search =  function (result)
    {
      SearchForResultsFactory.query({token: result},
      function(data)
      {
        $scope.serverResults=data;
      }


        );
     
    }

    $scope.doSomethingElse = function(suggestion){
      SearchForResultsFactory.query({token: suggestion},
      function(data)
      {
        $scope.serverResults=data;
      }


        );
     
      
    }
    }

    ]);

    var gem = {name:"andres"};
})();




