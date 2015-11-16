(function(){
    /**
    *  Module
    *
    * Description
    */
    angular.module('gemStore')
    .controller('SignupMainController',['$scope', 'registroService','ResultRetriever', 'QuestionnaireFactory','questionnaireService','UserByToken','autenticacionService','$mdDialog','MunicipiosFactory',
        function($scope,registroService, ResultRetriever, QuestionnaireFactory, questionnaireService,UserByToken,autenticacionService,$mdDialog,MunicipiosFactory){

            $scope.form=""; 
            $scope.showErrors=false;               
            $scope.tag = { result:  ""};
            $scope.doSomething = function(typedthings){
              $scope.results = ResultRetriever.getresults(typedthings, 'SuggestedTagsFactory');
              $scope.results.then(function(data){
                $scope.results = data;
              });
            }
            $scope.remove_tag = function(index){    
               $scope.usuario.tags.splice(index,1);    
            }
            $scope.add_tag = function(new_tag){
                if($scope.usuario.tags.indexOf(new_tag)==-1){
                    $scope.usuario.tags.push(new_tag);  
                }
                $scope.tag.result = "";
            }

            $scope.doSomethingElse = function(suggestion){
              $scope.add_tag(suggestion);
                $scope.tag.result = "";
            }

            MunicipiosFactory.query().$promise.then(function(an){
                console.log("Municipios ",an);
                $scope.municipios = an;
            }).catch(function(error){
                        console.log(error);
            });
          
            $scope.validate = function(model,icon,error)
            { 
                if(!$scope.showErrors)
                {    
                    if(model.$untouched)
                    {
                        return "";
                    }    
                }    
              
                if(model==$scope.form.email)
                {

                   if(!$scope.form.email.$error.required)
                   {
                     $scope.form.telefono.$setValidity("required", true);

                    
                   }   
                }  
                if(model==$scope.form.telefono)
                {

                   if(!$scope.form.telefono.$error.required)
                   {
                    $scope.form.email.$setValidity("required", true);
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

            $scope.changeView  = function (view,form,save){

                                    if(form != undefined)
                                    {    
                                        if(form.$valid){
                                                if(save)
                                                {
                                                    $scope.save(view);
                                                }
                                                else{    
                                                  registroService.changeView(view);
                                                  }
                                        }
                                        else
                                        {
                                            $scope.showErrors=true;
                                        }   
                                    }else{
                                        if (view === 'profileMain') {
                                            if(questionnaireService.getTipo()){
                                                registroService.changeView('solutions');        
                                            }   
                                            else{
                                                registroService.changeView(view);    
                                            }
                                        } else{
                                            registroService.changeView(view);    
                                        };
                                        
                                    }
                                };
            $scope.usuario      = registroService.getUsuario();            
            if ($scope.usuario.key) {
                data = {};
                UserByToken.us($scope.usuario.key).query().$promise.then(function(usu){                                                           
                  data = usu;
                  autenticacionService.setInfo($scope.usuario.key);
                  autenticacionService.setUser(usu);                        
                  console.log('Id: ',data.id);                                     
                  $scope.usuario = data;
                }).catch(function(error){
                  console.log(error);            
                });       
                console.log('USUARIO',$scope.usuario);                 
            }

            $scope.muni = function(index){
             $scope.usuario.ubicacion_institucion = $scope.municipios[index].nombre;
             $scope.usuario.apellido2 = $scope.usuario.apellido1;
             console.log($scope.usuario.ubicacion_institucion); 
            }

            $scope.usuarioRedes = registroService.getUsuarioRedes();
            $scope.getRedById = function(id)
                                {
                                    var longitud=0;
                                    if($scope.redes)
                                    {
                                        longitud=$scope.redes.length;
                                    }
                                    var i;
                                    for(i=0;i<longitud;i++)
                                    {
                                        if($scope.redes[i].id==id)
                                            return $scope.redes[i];
                                    }
                                    return -1;
                                };
            $scope.save = function(view) {                
                
                var promesa;
                console.log("guardando");
                    if($scope.usuario.id)
                    {    
                    promesa = $scope.usuario.$update();
                    }
                    else
                    {
                     promesa = $scope.usuario.$save();   
                    }    
                promesa.then(function(user){
                    // var respuesta = {};
                    // respuesta.cuestionarios = questionnaireService.getQuestionnaires();                    
                    // respuesta.id_usuario = user.id;     
                    var qf = new QuestionnaireFactory();
                    qf.cuestionarios = questionnaireService.getQuestionnaires();                    
                    qf.id_usuario = user.id;     
                    qf.tipo = questionnaireService.getTipo();     

                    qf.$save().then(function(proceso){
                        console.log(proceso);
                    }).catch(function(error){
                        console.log(error);
                    });


                    // .then(function(proceso){
                    //     console.log(proceso);
                    // }).catch(function(errores){
                    //     console.log("Errores",errores);                        
                    // }).finally(function(){
                    //     console.log("Se proceso el cuestionario");                        
                    //     questionnaireService.reset();
                    // });  
                    // console.log(respuesta.id_usuario);                    
                    registroService.changeView(view);
                    console.log(user);                    
                }).catch(function(errors){
                    console.log("Errores retornado por el POST de agregar usuario",errors);
                    if (errors.status === 400) {
                      $mdDialog.show(
                      $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#alertPop')))
                      .clickOutsideToClose(true)
                      .title('Error')
                      .content('El correo indicado ya existe, por favor cambielo e intentelo nuevamente.')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('Aceptar')
                      .targetEvent('$event')
                      );
                    } else{};
                }).finally(function(){                    
                    // registroService.changeView('user/'+user.id);
                });

                scope = {}
        };
    }]);
})();