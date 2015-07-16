/**
* gemStore Module
*
* ProblemEditController
*/
angular.module('gemStore')
.controller('ProblemsEditController',
	['CategoryFactory','ProblemFactory', '$scope', '$routeParams', '$location','ResultRetriever',
	function(CategoryFactory, ProblemFactory, $scope, $routeParams, $location,ResultRetriever){

	$scope.problem = ProblemFactory.get({id: $routeParams.idUser,idProblem: $routeParams.idProblem });
	$scope.isSubmitting = false;
	$scope.tag = { result:  ""};

	console.log("$scope.problem",$scope.problem);

	//categoreis related code
	$scope.categories = CategoryFactory.query({nivel:"2",categoria_padre:"1"});
	$scope.rootCategory = $scope.problem.toJSON();

	// console.log("$scope.rootCategory",$scope.rootCategory);
	$scope.categorias = CategoryFactory.query();

	$scope.clearCategoryArray = function(){
		debugger;
		$scope.problem.categorias[1]= null;
		$scope.problem.categorias[2]= null;
		console.log("$scope.problem.categorias[2]",$scope.problem.categorias[2]);
	};

	// console.log("$scope.Categorias",categ);
	// $scope.categorias = categ.map(function(categoria){
	// 	if (categoria.nivel === null) {
	// 		categoria.nivel = 0;
	// 	}
	// 	return categoria;
	// });
	// console.log("$scope.Categorias",$scope.categorias);
	
	$scope.rootCategories = CategoryFactory.query({nivel:"1"});
	var obj = $scope.categorias;
	// debugger;
	$scope.getCategoriesLevel2 = function(idParent,level){
		console.log("Level2 idParent",idParent);
		$scope.subcategoryTwo = CategoryFactory.query({categoria_padre:idParent,nivel:level});
		console.log($scope.subcategoryTwo);
	};

	$scope.getCategoriesLevel3 = function(idParent,level){
		console.log("Level3 idParent",idParent);
		$scope.subcategoryThree = CategoryFactory.query({categoria_padre:idParent,nivel:level});
		console.log($scope.subcategoryThree);
	};
	//tag related
	$scope.doSomething = function(typedthings){
      $scope.results = ResultRetriever.getresults(typedthings, 'SuggestedTagsFactory');
      $scope.results.then(function(data){
        $scope.results = data;
      });
    };
	$scope.remove_tag = function(index){
       $scope.problem.tags.splice(index,1);
	};
	$scope.add_tag = function(new_tag){
		if($scope.problem.tags.indexOf(new_tag)==-1){
			$scope.problem.tags.push(new_tag);
		}
		$scope.tag.result = "";
	};
    $scope.doSomethingElse = function(suggestion){
      $scope.add_tag(suggestion);
      	$scope.tag.result = "";
    };
    //
	$scope.saveProblem = function(problem){
		$scope.isSubmitting = true;
		console.log("problem:",problem);
		problem.$update({id:$routeParams.idUser,idProblem:$routeParams.idProblem})
		.then(function(problem){
			console.log("problema guardado exitosamente: ",problem);
		})
		.catch(function(error){
			console.log("Update problem in server errors: ",error);
		})
		.finally(function(){
			$scope.isSubmitting = false;
			$location.path("/user/"+$routeParams.idUser+"/problem/"+$routeParams.idProblem);
		});
	};
}]);