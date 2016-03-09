describe('Test suit that tests questionnaireService', function () {

    beforeEach(module('gemStore'));


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
                        "imagen": null,
                        "tipo_pregunta": "U",
                        "dato": 0
                    },
                    "orden": 1,
                    "cuestionario": 1,
                    "dependencia_respuestas": [

                    ],
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
                        "imagen": null,
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
            "descripcion": null,
            "imagen": "boton-que.png",
            "fecha": null,
            "enable": false
        },
        {
            "id": 2,
            "preguntas": [
                {
                    "id": 7,
                    "pregunta": {
                        "id": 3,
                        "opciones": [
                            {
                                "id": 6,
                                "respuesta": "Menos de $100.000",
                                "orden": 1,
                                "valor": "1",
                                "pregunta": 3,
                                "dato": false
                            }
                        ],
                        "enunciado": "¿Cuál es tu presupuesto?",
                        "imagen": null,
                        "tipo_pregunta": "U",
                        "dato": 0
                    },
                    "orden": 0,
                    "cuestionario": 2,
                    "dependencia_respuestas": [

                    ],
                    "enable": false
                }
            ],
            "titulo": "¿Cuál es tu presupuesto?",
            "descripcion": null,
            "imagen": "boton-cuanto.png",
            "fecha": null,
            "enable": false
        }
    ];


    beforeEach(inject(function (questionnaireService) {
        mockQuestionnaireService = questionnaireService;
        mockQuestionnaireService.setQuestionnaires(questionaires);
    }));


    it('should verify that controller gets all Questionnaires', function () {
        var Questionnaires=null;
        Questionnaires=mockQuestionnaireService.getQuestionnaires();
        expect(Questionnaires).not.toBe(null);
    });


    it('should verify that "¿Qué buscas?" questionnaire id is 0', function () {
        expect(mockQuestionnaireService.getQuestionnaire(0).titulo).toEqual('¿Qué buscas?');
    });

    it('should verify that "¿cuál es tu presupuesto?" questionnaire id is 1', function () {
        expect(mockQuestionnaireService.getQuestionnaire(1).titulo).toEqual('¿Cuál es tu presupuesto?');
    });
});


