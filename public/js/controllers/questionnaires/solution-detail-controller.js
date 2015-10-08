angular.module('gemStore')
.controller('SolutionDetailController', ['$scope','Constantes','SolutionFactory','solutionService', '$location', 'QuestionnaireFactory','questionnaireService', 'navBar', 'DetailFactory',
	function($scope,Constantes,SolutionFactory,solutionService, $location, QuestionnaireFactory, questionnaireService, navBar, DetailFactory){
                //Rutas Imagenes
        $scope.ruta = Constantes.ruta_imagenes + "botones/";                        
        $scope.img1 = $scope.ruta + 'icono-registro.png';              
        $scope.img_cerrar = $scope.ruta + 'boton-conectarse.png';              
        $scope.img_anterior = $scope.ruta + 'boton-regresar.png';              
        $scope.img_siguiente = $scope.ruta + 'boton-siguiente.png';              
        $scope.load = true;
        
        // $scope.solution = solutionService.getSolution();        
        $scope.questionnaires = questionnaireService.getQuestionnaires();
        // 
        $scope.solutions = solutionService.getSolutions();                
        
        

        $scope.toggleRight = function(){                                
	      navBar.open();
	    }

	    $scope.close= function(){
	      navBar.close();
	    }

	    $scope.menu_bar = function (view){
	      questionnaireService.changeView(view);                      
	    }

        getDetailSolution();

        function getDetailSolution() {            
            // Información del cuestionario para enviarlo
            var qf = new QuestionnaireFactory();
            qf.cuestionarios = questionnaireService.getQuestionnaires();                                        
            qf.tipo = questionnaireService.getTipo();    

            DetailFactory.save({cuestionario:qf,id_ps:solutionService.getId()}).$promise.
            then(function(respuesta){                                
                $scope.detail = respuesta.respuesta;
                $scope.solution = $scope.solutions[solutionService.getIndex()];
                // Color segun afinidad
                for (var i = $scope.detail.length - 1; i >= 0; i--) {
                    for (var j = $scope.detail[i].respuestas.length - 1; j >= 0; j--) {
                        if ($scope.detail[i].respuestas[j].afinidad > 75 ) {
                            $scope.detail[i].respuestas[j].clase_color = 'color_verde';
                        } 
                        else{
                            if ($scope.detail[i].respuestas[j].afinidad < 25) {
                                $scope.detail[i].respuestas[j].clase_color = 'color_rojo';
                            } else{
                                $scope.detail[i].respuestas[j].clase_color = 'color_amarillo';
                            };
                        };

                        if ($scope.detail[i].respuestas[j].respuesta2 === "") {
                            $scope.detail[i].respuestas[j].respuesta2 = 'No ofrece este servicio';
                        } 
                    };
                };
                console.log('Detalle:',$scope.detail);
                console.log('Solución:',$scope.solution);

            })
            .catch(function(errors){
                console.log(errors);
            })
            .finally(function(){
                console.log("Finally");                
                $scope.load = false;
            });          
        }

        $scope.siguiente = function(){            
            $scope.load = true;
            if (solutionService.getIndex() < 9) {
                solutionService.setIndex(solutionService.getIndex() + 1);
                solutionService.setId($scope.solutions[solutionService.getIndex()].problema_solucion.id);
                getDetailSolution();
            }
            else{              
                solutionService.setPage(solutionService.getPage() + 1 );
                getResultsPage(solutionService.getPage(),0);                
            };
        }

        $scope.anterior = function(){   
        $scope.load = true;         
            if (solutionService.getIndex() > 0) {
                solutionService.setIndex(solutionService.getIndex() - 1);
                solutionService.setId($scope.solutions[solutionService.getIndex()].problema_solucion.id);
                getDetailSolution();
            }
            else{                
                solutionService.setPage(solutionService.getPage() - 1 );
                getResultsPage(solutionService.getPage(),9);                
            };
        }     
       

        function getResultsPage(pageNumber,index) {            
        //Definición de objeto para envio cuestionario y tipo        
            var qf = new QuestionnaireFactory();
            qf.cuestionarios = questionnaireService.getQuestionnaires();                                        
            qf.tipo = questionnaireService.getTipo();

            SolutionFactory.save({cuestionario:qf,pagina:pageNumber}).$promise.
            then(function(info){                                
                solutionService.setSolutions(info.problemas_soluciones);
                solutionService.setIndex(index);
                $scope.solutions = solutionService.getSolutions();                
                solutionService.setId($scope.solutions[solutionService.getIndex()].problema_solucion.id);
                getDetailSolution();                
            })
            .catch(function(errors){
                console.log(errors);
            })
            .finally(function(){
                console.log("in finally");                                
            });          
        }

}]);