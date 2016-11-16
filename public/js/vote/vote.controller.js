'use strict';

angular.module('vote')
    .controller('VoteController', function ($scope, SearchForResultsFactory,
                                            $location, $mdDialog,authenticationService,$auth,$q) {
    	console.log("vote controller");
var alreadyLoggedIn = authenticationService.getUser();
    	            $scope.authenticate = function (provider) {
                if (alreadyLoggedIn) {
                    console.log("alreadyLoggedIn")
                } else {
                    $auth.authenticate(provider).then(function (response) {
                    	console.log(response);
                        $auth.setToken(response.data.token);
                        var credentials = {
                            username: response.data.username
                        };
                        var deferred = $q.defer()
                        authenticationService.loginSocialMedia(credentials, response.data.token, deferred).finally(
                            function () {
                            	console.log("ejecutando patch")
                            	$http.patch(API_CONFIG.url + API_CONFIG.user_detail, {
				                        tipo_cuenta: 'T'
				                    },
				                    {
				                        headers: {
				                            'Authorization': 'Token ' + authenticationService.getUser().token
				                        }
				                    }).then(function (response) {
				                    	console.log("ahora turista");
				                    
				                });
                                console.log("calificacion");
                            }
                        );
                    }).catch(function (error) {
                        console.log('hubo un error', error);
                    });
                }
            };

     
    });
