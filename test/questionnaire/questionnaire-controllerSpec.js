describe('Test suit that tests QuestionsController', function () {

    beforeEach(module('userModule'));
    beforeEach(module('gemStore'));


    var mockController;
    var mockScope;
    var mockQuestionnaireService;
    var questionaires = [
        {
            "id": 1,
            "preguntas": [
                {
                    "id": 5,
                    "pregunta": {
                        "id": 1,
                        "opciones": [
                            {
                                "id": 38,
                                "respuesta": "Equipos",
                                "orden": 1,
                                "valor": "1",
                                "pregunta": 1,
                                "dato": false
                            }
                        ],
                        "enunciado": "¿Qué necesitas?",
                        "tipo_pregunta": "U",
                        "dato": 0
                    },
                    "orden": 1,
                    "cuestionario": 1,
                    "dependencia_respuestas": [],
                    "enable": false
                },
                {
                    "id": 30,
                    "pregunta": {
                        "id": 22,
                        "opciones": [
                            {
                                "id": 105,
                                "respuesta": "Carrito de compras",
                                "orden": 1,
                                "valor": "1",
                                "pregunta": 22,
                                "dato": false
                            }
                        ],
                        "enunciado": "¿Qué herramientas de Venta en Línea necesitas?",
                        "tipo_pregunta": "M",
                        "dato": 0
                    },
                    "orden": 13,
                    "cuestionario": 1,
                    "dependencia_respuestas": [
                        59
                    ],
                    "enable": false
                }
            ],
            "titulo": "¿Qué buscas?",
            "imagen": "boton-que.png",
            "enable": false
        }
    ];


    beforeEach(inject(function (questionnaireService, $controller, $routeParams, $rootScope) {
        mockScope = $rootScope.$new();
        mockQuestionnaireService = questionnaireService;

        spyOn(mockQuestionnaireService, 'getQuestionnaires').and.returnValue(questionaires);

        spyOn(mockQuestionnaireService, 'getQuestionnaire').and.callFake(function (index) {
            return questionaires[index];
        });


        $routeParams.idQuestionnaire = 0;
        mockController = $controller('QuestionsController', {
            $scope: mockScope,
            questionnaireService: mockQuestionnaireService
        });
    }));

    it('should check that user has selected at least one answer on checkbox buttons questionnaire', function () {
        mockScope.mclick(40, true);
        expect(mockQuestionnaireService.getAnswers()).toEqual([40]);
    });

    it('should check that user has selected an answer on radio buttons questionnaire', function () {
        mockScope.uclick(38);
        expect(mockQuestionnaireService.getAnswers()).toEqual([38]);
    });

    it('should check that if user has answered a radio button questionnaire Next button must be visible', function () {
        mockScope.uclick(38);
        expect(mockScope.isNextButtonVisible).toEqual(true);
    });

    it('should check that if user has answered the list option questionnaire Next button must be visible', function () {
        mockScope.listOptionsClick();
        expect(mockScope.isNextButtonVisible).toEqual(true);
    });

    it('should check that user can continue when this has selected an answer', function () {
        var temp = mockScope.currentQuestion;

        mockQuestionnaireService.addAnswer('answer');
        mockScope.next();
        expect(mockScope.currentQuestion).not.toEqual(temp)
    });

    it('should check that user can not continue when this has not selected an answer', function () {
        var temp = mockScope.currentQuestion;

        mockScope.next();
        expect(mockScope.currentQuestion).toEqual(temp)
    });
});


