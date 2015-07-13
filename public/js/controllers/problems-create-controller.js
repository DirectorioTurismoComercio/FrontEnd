/**
* gemStore Module
*['ProblemFactory', '$scope', '$routeParams', '$location','ResultRetriever',
	function(ProblemFactory, $scope, $routeParams, $location,ResultRetriever){
	
*/
angular.module('gemStore')
.controller('ProblemsCreateController', 
	['ProblemFactory', '$scope', '$routeParams', '$location','ResultRetriever','registroService',
	function(ProblemFactory, $scope, $routeParams, $location,ResultRetriever,registroService){
	var idUsuario = registroService.getUsuario().id;	
	$scope.problem = new ProblemFactory();
	//TODO: create category model
	$scope.problem.categorias=[1];  // VALOR QUEMADO. FALTA INTEGRAR CON CATEGORIAS
	$scope.problem.tags=[];
	$scope.problem.usuario  =Number(idUsuario);
	$scope.isSubmitting     =false;
	$scope.tag = { result:  ""};
	$scope.form="";
	$scope.showErrors=false;
	$scope.doSomething = function(typedthings){
      $scope.results = ResultRetriever.getresults(typedthings, 'SuggestedTagsFactory');

      $scope.results.then(function(data){
        $scope.results = data;
      });
    }
	$scope.remove_tag = function(index){	
       $scope.problem.tags.splice(index,1);    
	}
	$scope.add_tag = function(new_tag){
		if($scope.problem.tags.indexOf(new_tag)==-1){
			$scope.problem.tags.push(new_tag);	
		}
		
		$scope.tag.result = "";
	}

    $scope.doSomethingElse = function(suggestion){
      $scope.add_tag(suggestion);
      	$scope.tag.result = "";
    }
     $scope.validate = function(model,icon,error)
            { 
                
                if(!$scope.showErrors)
                {    
                    if(model.$untouched)
                    {
                        return "";
                    }    
                }    
              
                
                if(icon!=undefined)
                {
                          if(model.$invalid)
                            {
                                
                                return "glyphicon glyphicon-remove form-control-feedback";   
                                
                            }
                            else
                            {

                                return "glyphicon glyphicon-ok form-control-feedback";               
                            
                            }

                }
                else{ 
                	
                        if(model.$invalid)
                        {
                            
                            return "form-group has-error has-feedback";   
                            
                        }
                        else
                        {

                            
                            return "form-group has-success has-feedback";               
                        
                        }
                        
                    }
                  
             };                

	$scope.saveProblem      =function(problem,form){
		
		
		if(form.$valid)
		{	
				problem.$save({id:idUsuario})
					.then(function(problem){
						// console.log("------this is the problem returned from server: ",problem);
						$location.path("user/problems");
					}).catch(function(errors){
						//validations
						console.log("SAVING PROBLEM - ERRORS returned from server: ",errors);
					}).finally(function(){
						$scope.isSubmitting = false;
					});
			
		}
		else
		{
			$scope.showErrors=true;
		}	
	};
}]);