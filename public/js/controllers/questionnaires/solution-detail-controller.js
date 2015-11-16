angular.module('gemStore')
.controller('SolutionDetailController', ['$scope','Constantes','SolutionFactory','solutionService', '$location', 'QuestionnaireFactory','questionnaireService', 'navBar', 'DetailFactory','autenticacionService','BusquedaSolucionFactory','$mdToast','conexionService',
	function($scope,Constantes,SolutionFactory,solutionService, $location, QuestionnaireFactory, questionnaireService, navBar, DetailFactory, autenticacionService,BusquedaSolucionFactory,$mdToast,conexionService){
                //Rutas Imagenes
        $scope.ruta = Constantes.ruta_imagenes + "botones/";                        
        $scope.img1 = $scope.ruta + 'icono-registro.png';              
        $scope.img_cerrar = $scope.ruta + 'boton-conectarse.png';              
        $scope.img_anterior = $scope.ruta + 'boton-regresar.png'; 
        $scope.anterior = $scope.ruta+'boton-regresar.png';            
        $scope.img_siguiente = $scope.ruta + 'boton-siguiente.png';              
        $scope.load = true;
        var logg = true;
        
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
          if (autenticacionService.getInfo()) {
            questionnaireService.changeView("/profileSearchDetail");                      
          } else{
            questionnaireService.changeView(view);                      
          };          
        }

        getDetailSolution();

        function getDetailSolution() {            
            // Información del cuestionario para enviarlo
            var qf = new QuestionnaireFactory();
            qf.cuestionarios = questionnaireService.getQuestionnaires();                                        
            qf.tipo = questionnaireService.getTipo();    

            console.log('Prueba Soluciones',solutionService.getId());
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

        $scope.reg = function(){                   
            $location.path('personalData');                               
        }

        $scope.logged = function(){
            if (autenticacionService.getInfo() && logg) {                
                return true;
            } else{         
                return false;
            };                        
        }

        $scope.conectar = function(){
            if (autenticacionService.getInfo() && logg) {                
                //Loggeado                
                var inf_sol = $scope.solutions[solutionService.getIndex()];
                conexionService.setBusqueda(autenticacionService.getIdBusqueda());
                conexionService.setSolucion(inf_sol);                                
                $location.path('conexionMain');   
            } else{         
                //No Loggeado
                $location.path('personalData');   
            };  
        }

        $scope.guardarSolucion = function(){                   
            var busq = autenticacionService.getIdBusqueda();
            var solu = solutionService.getId();
            console.log(busq,solu);
            var s = $scope.solutions[solutionService.getIndex()];
            
            BusquedaSolucionFactory.save({"busqueda": busq, "respuesta": solu,"titulo": s.problema_solucion.titulo,"descripcion": s.problema_solucion.descripcion,"fecha": s.problema_solucion.fecha ,"tipo": s.problema_solucion.tipo}).$promise.then(function(resultado){                                            
            // BusquedaSolucionFactory.save({"busqueda": busq, "respuesta": solu}).$promise.then(function(resultado){                                            
                console.log(resultado);
                $scope.openToast();
            }).catch(function(error){
                console.log(error);
            });
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

      var last = {
        bottom: false,
        top: true,
        left: false,
        right: true
      };
      $scope.toastPosition = angular.extend({},last);
      $scope.getToastPosition = function() {    
        return Object.keys($scope.toastPosition)
        .filter(function(pos) { return $scope.toastPosition[pos]; })
        .join(' ');
      };  
      $scope.openToast = function($event) {
        logg = false;
        $mdToast.show(
          $mdToast.simple().content('Solución Agregada')        
          .position($scope.getToastPosition())
          .hideDelay(1000)
        );
      };

}]);