/**
 * gemStore Module
 *
 * ProblemsShowController un solo problema para un usuario
 */
angular.module('gemStore')
    .controller('QuestionsController', ['$scope', '$location', '$routeParams', 'questionnaireService', 'Constantes',
        function ($scope, $location, $routeParams, questionnaireService, Constantes) {
            $scope.ruta = Constantes.ruta_imagenes + 'botones/';
            $scope.siguiente = $scope.ruta + 'boton-siguiente-over.png';
            $scope.anterior = $scope.ruta + 'boton-regresar.png';
            $scope.isNextButtonVisible = false;
            var answersTemplateURL = "templates/questionnaires/";


            $scope.questionnaire = questionnaireService.getQuestionnaire($routeParams.idQuestionnaire);


            questionnaires = questionnaireService.getQuestionnaires();


            // Borrar la posición correspondiente al routeparams en el questionnaire
            questionnaires[$routeParams.idQuestionnaire].enable = false;


            for (var i = 0; i < questionnaires[$routeParams.idQuestionnaire].preguntas.length; i++) {
                questionnaires[$routeParams.idQuestionnaire].preguntas[i].enable = false;
                questionnaires[$routeParams.idQuestionnaire].preguntas[i].pregunta.dato = 0;
                for (var j = 0; j < questionnaires[$routeParams.idQuestionnaire].preguntas[i].pregunta.opciones.length; j++) {
                    questionnaires[$routeParams.idQuestionnaire].preguntas[i].pregunta.opciones[j].dato = false;
                }
            }

            questionnaireService.setQuestionnaires(questionnaires);
            $scope.questionnaire = questionnaires[$routeParams.idQuestionnaire];

            questionnaireService.clearAnswers();

            //

            var currentQuestionIndex = 0;
            var maxIndex = $scope.questionnaire.preguntas.length - 1;
            console.log(currentQuestionIndex, maxIndex);
            $scope.questionnaire.enable = true;
            changeQuestion();

            $scope.next = function () {
                if ((questionnaireService.getAnswers()).length != 0 || $scope.currentQuestion.dato != 0) {
                    currentQuestionIndex++;
                    changeQuestion();
                    $scope.isNextButtonVisible = false;
                }
            }

            $scope.previous = function () {
                currentQuestionIndex--;
                changeQuestion();
                console.log(currentQuestionIndex, maxIndex);
            }


            $scope.uclick = function (idOpcion) {

                for (var i = 0; i < $scope.currentQuestion.opciones.length; i++) {
                    questionnaireService.removeAnswer($scope.currentQuestion.opciones[i].id);
                }
                questionnaireService.addAnswer(parseInt(idOpcion));

                $scope.isNextButtonVisible = true;

            }


            $scope.mclick = function (idOpcion, dato) {

                if (dato) {
                    questionnaireService.addAnswer(parseInt(idOpcion));
                }
                else {
                    questionnaireService.removeAnswer(idOpcion);
                }
            }


            $scope.changeCheckBoxState = function () {
                var numberOfSelectedOptions = 0;

                for (var optionId = 0; optionId < $scope.currentQuestion.opciones.length; optionId++) {
                    if ($scope.currentQuestion.opciones[optionId].dato == true) {
                        numberOfSelectedOptions++
                    }
                }

                numberOfSelectedOptions > 0 ? $scope.isNextButtonVisible = true : $scope.isNextButtonVisible = false;

            }


            $scope.listOptionsClick = function () {
                $scope.isNextButtonVisible = true;
            }


            function activeQuestion() {
                var dependencia_respuestas = $scope.questionnaire.preguntas[currentQuestionIndex].dependencia_respuestas;
                // console.log(dependencia_respuestas);
                if (dependencia_respuestas.length == 0) {
                    return true;
                }
                console.log("Nuevo: ", questionnaireService.getAnswers());
                for (var k = 0; k < dependencia_respuestas.length; k++) {
                    if (questionnaireService.getAnswers().indexOf(parseInt(dependencia_respuestas[k])) != -1) return true;
                }
                return false;
            }

            function changeQuestion() {


                if (currentQuestionIndex > maxIndex || currentQuestionIndex < 0) {
                    if (currentQuestionIndex > maxIndex) {
                        questionnaireService.setFull($routeParams.idQuestionnaire);
                        questionnaireService.setConta();
                    }
                    ;
                    $location.path('questionnaires');
                } else {
                    $scope.currentQuestion = $scope.questionnaire.preguntas[currentQuestionIndex].pregunta;
                    if (activeQuestion()) {
                        $scope.questionnaire.preguntas[currentQuestionIndex].enable = true;
                        switch ($scope.currentQuestion.tipo_pregunta) {
                            case "U":
                                $scope.answersTemplate = answersTemplateURL + "_u_question.html";
                                break;
                            case "M":
                                $scope.answersTemplate = answersTemplateURL + "_m_question.html";
                                break;
                            case "L":
                                $scope.answersTemplate = answersTemplateURL + "_l_question.html";
                                break;
                        }
                    }
                    else {
                        $scope.questionnaire.preguntas[currentQuestionIndex].enable = false;
                        $scope.next();
                    }
                }
            }


            function displayNextButton() {
                return true;
            }


            $scope.oyb = function (dato) {
                type = questionnaireService.getTipo();
                if (type == dato) {
                    return true;
                } else {
                    return false;
                }
                ;
            }

        }]);