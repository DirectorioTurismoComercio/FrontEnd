'use strict';

angular.module('vote')
    .controller('VoteController', function ($scope, SearchForResultsFactory,
                                            $location, $mdDialog,authenticationService,
                                            $auth,$q,$http,API_CONFIG,selectedSite,ngDialog, RatingService, $rootScope) {
              
    	
        var loginWindow;
        var rateWindow;
        
        if(!authenticationService.getUser()){
        openLoginWindow();
        }

        $scope.site = {"rating":0};
        
        function openLoginWindow  () {
                loginWindow=ngDialog.open({
                    template: 'js/vote/touristSignUp.html',
                    width: 'auto',
                    showClose: false,
                    scope: $scope,
                    closeByEscape: true,
                    closeByDocument: true,
                    closeByNavigation: true
                });
        }
        $scope.send = function(){
            if(!authenticationService.getUser()){
                openLoginWindow();
            }else{
            RatingService.rateSite(selectedSite,$scope.site.rating);
            $rootScope.$broadcast('ratingDone',0);
            ngDialog.close();
            }
        }
        $scope.authenticate = function (provider) {
                
        $auth.authenticate(provider).then(function (response) {
            $auth.setToken(response.data.token);
            var deferred = $q.defer()
            var credentials = {
                username: response.data.username
            };
             
            authenticationService.loginSocialMedia(credentials, response.data.token, deferred).finally(
                function () {
                    loginWindow.close();
                    if(authenticationService.getUser().tipo_cuenta!='C'){
                    changeToTouristAccount();
                    }
                }
            );
            }).catch(function (error) {
                console.log('hubo un error', error);
            });        
        };
        function changeToTouristAccount(){

                  
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
