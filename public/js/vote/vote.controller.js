'use strict';

angular.module('vote')
    .controller('VoteController', function ($scope, SearchForResultsFactory,
                                            $location, $mdDialog,authenticationService,$auth,$q,$http,API_CONFIG,$window) {
              
    	console.log("vote controller");
var alreadyLoggedIn = authenticationService.getUser();
               
    	     $scope.authenticate = function (provider) {
                
                if (alreadyLoggedIn) {
                    console.log("alreadyLoggedIn")
                } else {
                    

                    $auth.authenticate(provider).then(function (response) {
                        $auth.setToken(response.data.token);
                        var credentials = {
                            username: response.data.username
                        };
                        var deferred = $q.defer()
                        authenticationService.loginSocialMedia(credentials, response.data.token, deferred).finally(
                            function () {
                                f1()
                            }
                        );
                    }).catch(function (error) {
                        console.log('hubo un error', error);
                    });
/*
                    $auth.authenticate(provider).then(function (response) {
                        
                    	console.log(response);
                        $auth.setToken(response.data.token);
                        var credentials = {
                            username: response.data.username
                        };
                        var deferred = $q.defer()
                            $http.get(API_CONFIG.url  + API_CONFIG.user_detail, { headers: {'Authorization': 'Token ' + response.data.token} })
                            .success(function(response){
                
                            //$window.localStorage["user"] = JSON.stringify(user);
                            f1();
                        });

                        });

*/
                    
                
                
                }
                

            };
            function f1(){

                  
                                $http.patch(API_CONFIG.url + API_CONFIG.user_detail, {
                                        tipo_cuenta: 'T'
                                    },
                                    {
                                        headers: {
                                            'Authorization': 'Token ' + authenticationService.getUser().token
                                        }
                                    }).then(function (response) {
                                        console.log("ahora turista");
                                    
                                },
                                function (error){
                                    console.log(error);
                                }
                                );
               

            };


     
    });
