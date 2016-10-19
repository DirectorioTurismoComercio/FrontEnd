'use strict';

angular.module('popup', [])
    .service('PopupService', function ($location, $translate, $rootScope, $q, ngDialog) {
        var scope = $rootScope.$new();

        function showYesNoMessage(titleId, messageId, yesLabelId, noLabelId) {
            var deferred = $q.defer();

            var options = {
                title: titleId,
                message: messageId,
                yesLabel: yesLabelId,
                noLabel: noLabelId,
                yesCallback: function () {
                    ngDialog.close();
                    deferred.resolve();
                },

                noCallback: function () {
                    ngDialog.close();
                    deferred.reject();
                }
            };

            angular.extend(scope, options);

            ngDialog.open({
                template: 'js/popup/template.html',
                width: 'auto',
                showClose: false,
                scope: scope,
                closeByEscape: false,
                closeByDocument: false
            });

            return deferred.promise;
        }

        function showYesMessage(titleId, messageId, yesLabelId) {
            var deferred = $q.defer();

            var options = {
                title: titleId,
                message: messageId,
                yesLabel: yesLabelId,
                yesCallback: function () {
                    ngDialog.close();
                    deferred.resolve();
                }
            };

            angular.extend(scope, options);

            ngDialog.open({
                template: 'js/popup/template.html',
                width: 'auto',
                showClose: false,
                scope: scope,
                closeByEscape: true,
                closeByDocument: true
            });

            return deferred.promise;
        }


        return {
            showYesNoMessage: showYesNoMessage,
            showYesMessage: showYesMessage
        }
    });
