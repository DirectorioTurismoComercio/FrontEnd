'use strict';

angular.module('vote')
    .controller('touristSignUpController', function ($scope, authenticationService, $http, API_CONFIG, ngDialog, $auth,$q, selectedSite) {

        $scope.authenticate = function (provider) {

            $auth.authenticate(provider).then(function (response) {
                $auth.setToken(response.data.token);
                var deferred = $q.defer()
                var credentials = {
                    username: response.data.username
                };

                authenticationService.loginSocialMedia(credentials, response.data.token, deferred).finally(
                    function () {
                        ngDialog.close();
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
                    openRatingWindow();
                    console.log("ahora turista");

                },
                function (error){
                    console.log(error);
                }
            );


        };


        function openRatingWindow(){
            var ratingWindow = ngDialog.open({
                template: 'js/vote/rateWindow.html',
                width: 'auto',
                showClose: false,
                scope: $scope,
                closeByEscape: true,
                closeByDocument: true,
                closeByNavigation: true,
                resolve: {
                    selectedSite: function () {

                        return selectedSite;
                    }
                },
                controller: 'VoteController'
            });
        }


    });
