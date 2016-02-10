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
                    "id": 14,
                    "pregunta": {
                        "id": 8,
                        "opciones": [
                            {
                                "id": 23,
                                "respuesta": "Servidores",
                                "orden": 1,
                                "valor": "1",
                                "pregunta": 8,
                                "dato": false
                            }
                        ],
                        "enunciado": "¿Qué equipos buscas?",
                        "imagen": null,
                        "tipo_pregunta": "M",
                        "dato": 0
                    },
                    "orden": 1,
                    "cuestionario": 1,
                    "dependencia_respuestas": [
                        38
                    ],
                    "enable": false
                },
                {
                    "id": 15,
                    "pregunta": {
                        "id": 9,
                        "opciones": [
                            {
                                "id": 34,
                                "respuesta": "Programas contables y administrativos",
                                "orden": 2,
                                "valor": "2",
                                "pregunta": 9,
                                "dato": false
                            },
                            {
                                "id": 35,
                                "respuesta": "Programas de Facturación",
                                "orden": 3,
                                "valor": "3",
                                "pregunta": 9,
                                "dato": false
                            },
                            {
                                "id": 36,
                                "respuesta": "Programas personalizados",
                                "orden": 4,
                                "valor": "4",
                                "pregunta": 9,
                                "dato": false
                            },
                            {
                                "id": 37,
                                "respuesta": "Programas de Oficina",
                                "orden": 5,
                                "valor": "5",
                                "pregunta": 9,
                                "dato": false
                            },
                            {
                                "id": 121,
                                "respuesta": "Programas Sector Hotelero",
                                "orden": 6,
                                "valor": "6",
                                "pregunta": 9,
                                "dato": false
                            },
                            {
                                "id": 122,
                                "respuesta": "Programas para Restaurantes",
                                "orden": 7,
                                "valor": "7",
                                "pregunta": 9,
                                "dato": false
                            },
                            {
                                "id": 32,
                                "respuesta": "Videojuegos",
                                "orden": 11,
                                "valor": "1",
                                "pregunta": 9,
                                "dato": false
                            }
                        ],
                        "enunciado": "¿Qué programas buscas?",
                        "imagen": null,
                        "tipo_pregunta": "M",
                        "dato": 0
                    },
                    "orden": 2,
                    "cuestionario": 1,
                    "dependencia_respuestas": [
                        39
                    ],
                    "enable": false
                },
                {
                    "id": 16,
                    "pregunta": {
                        "id": 10,
                        "opciones": [
                            {
                                "id": 41,
                                "respuesta": "Diseño",
                                "orden": 4,
                                "valor": "4",
                                "pregunta": 10,
                                "dato": false
                            },
                            {
                                "id": 42,
                                "respuesta": "Capacitación",
                                "orden": 5,
                                "valor": "5",
                                "pregunta": 10,
                                "dato": false
                            },
                            {
                                "id": 43,
                                "respuesta": "Mantenimiento",
                                "orden": 6,
                                "valor": "6",
                                "pregunta": 10,
                                "dato": false
                            }
                        ],
                        "enunciado": "¿Qué servicio necesitas?",
                        "imagen": null,
                        "tipo_pregunta": "U",
                        "dato": 0
                    },
                    "orden": 3,
                    "cuestionario": 1,
                    "dependencia_respuestas": [
                        40
                    ],
                    "enable": false
                },
                {
                    "id": 17,
                    "pregunta": {
                        "id": 11,
                        "opciones": [
                            {
                                "id": 47,
                                "respuesta": "Diseño de logos",
                                "orden": 1,
                                "valor": "1",
                                "pregunta": 11,
                                "dato": false
                            },
                            {
                                "id": 48,
                                "respuesta": "Identidad corporativa",
                                "orden": 2,
                                "valor": "2",
                                "pregunta": 11,
                                "dato": false
                            },
                            {
                                "id": 49,
                                "respuesta": "Material Publicitario",
                                "orden": 3,
                                "valor": "3",
                                "pregunta": 11,
                                "dato": false
                            },
                            {
                                "id": 50,
                                "respuesta": "Fotografía y Video",
                                "orden": 4,
                                "valor": "4",
                                "pregunta": 11,
                                "dato": false
                            }
                        ],
                        "enunciado": "¿Qué tipo de diseño?",
                        "imagen": null,
                        "tipo_pregunta": "U",
                        "dato": 0
                    },
                    "orden": 4,
                    "cuestionario": 1,
                    "dependencia_respuestas": [
                        41
                    ],
                    "enable": false
                },
                {
                    "id": 18,
                    "pregunta": {
                        "id": 12,
                        "opciones": [
                            {
                                "id": 51,
                                "respuesta": "Manejo de programas",
                                "orden": 1,
                                "valor": "1",
                                "pregunta": 12,
                                "dato": false
                            },
                            {
                                "id": 52,
                                "respuesta": "Manejo de Equipos",
                                "orden": 2,
                                "valor": "2",
                                "pregunta": 12,
                                "dato": false
                            },
                            {
                                "id": 53,
                                "respuesta": "Manejo de Redes Sociales",
                                "orden": 3,
                                "valor": "3",
                                "pregunta": 12,
                                "dato": false
                            }
                        ],
                        "enunciado": "¿Qué tipo de capacitación necesitas?",
                        "imagen": null,
                        "tipo_pregunta": "M",
                        "dato": 0
                    },
                    "orden": 5,
                    "cuestionario": 1,
                    "dependencia_respuestas": [
                        42
                    ],
                    "enable": false
                },
                {
                    "id": 19,
                    "pregunta": {
                        "id": 13,
                        "opciones": [
                            {
                                "id": 54,
                                "respuesta": "Mantenimiento de Páginas Web",
                                "orden": 1,
                                "valor": "1",
                                "pregunta": 13,
                                "dato": false
                            },
                            {
                                "id": 55,
                                "respuesta": "Mantenimiento de Equipos",
                                "orden": 2,
                                "valor": "2",
                                "pregunta": 13,
                                "dato": false
                            },
                            {
                                "id": 56,
                                "respuesta": "Mantenimiento de redes",
                                "orden": 3,
                                "valor": "3",
                                "pregunta": 13,
                                "dato": false
                            }
                        ],
                        "enunciado": "¿Qué tipo de mantenimiento necesitas?",
                        "imagen": null,
                        "tipo_pregunta": "M",
                        "dato": 0
                    },
                    "orden": 6,
                    "cuestionario": 1,
                    "dependencia_respuestas": [
                        43
                    ],
                    "enable": false
                },
                {
                    "id": 20,
                    "pregunta": {
                        "id": 14,
                        "opciones": [
                            {
                                "id": 57,
                                "respuesta": "Páginas WEB",
                                "orden": 1,
                                "valor": "1",
                                "pregunta": 14,
                                "dato": false
                            },
                            {
                                "id": 58,
                                "respuesta": "Herramientas de posicionamiento",
                                "orden": 2,
                                "valor": "2",
                                "pregunta": 14,
                                "dato": false
                            },
                            {
                                "id": 59,
                                "respuesta": "Venta en Línea",
                                "orden": 3,
                                "valor": "3",
                                "pregunta": 14,
                                "dato": false
                            },
                            {
                                "id": 101,
                                "respuesta": "Publicidad en Internet",
                                "orden": 4,
                                "valor": "4",
                                "pregunta": 14,
                                "dato": false
                            },
                            {
                                "id": 103,
                                "respuesta": "Diseño de Aplicaciones Móviles",
                                "orden": 5,
                                "valor": "5",
                                "pregunta": 14,
                                "dato": false
                            },
                            {
                                "id": 123,
                                "respuesta": "Redes Sociales",
                                "orden": 5,
                                "valor": "5",
                                "pregunta": 14,
                                "dato": false
                            }
                        ],
                        "enunciado": "¿Qué necesitas en Internet?",
                        "imagen": null,
                        "tipo_pregunta": "U",
                        "dato": 0
                    },
                    "orden": 7,
                    "cuestionario": 1,
                    "dependencia_respuestas": [
                        44
                    ],
                    "enable": false
                },
                {
                    "id": 32,
                    "pregunta": {
                        "id": 26,
                        "opciones": [
                            {
                                "id": 164,
                                "respuesta": "Desarrollo de Software",
                                "orden": 1,
                                "valor": "1",
                                "pregunta": 26,
                                "dato": false
                            },
                            {
                                "id": 165,
                                "respuesta": "Recursos turísticos",
                                "orden": 2,
                                "valor": "2",
                                "pregunta": 26,
                                "dato": false
                            },
                            {
                                "id": 166,
                                "respuesta": "Seguridad en la industria hotelera",
                                "orden": 3,
                                "valor": "3",
                                "pregunta": 26,
                                "dato": false
                            },
                            {
                                "id": 167,
                                "respuesta": "Estrategias de atención al cliente",
                                "orden": 4,
                                "valor": "4",
                                "pregunta": 26,
                                "dato": false
                            },
                            {
                                "id": 168,
                                "respuesta": "Turismo Gastronómico",
                                "orden": 5,
                                "valor": "5",
                                "pregunta": 26,
                                "dato": false
                            },
                            {
                                "id": 169,
                                "respuesta": "Producción de Servicios Turísticos",
                                "orden": 6,
                                "valor": "6",
                                "pregunta": 26,
                                "dato": false
                            },
                            {
                                "id": 170,
                                "respuesta": "Gestión de destinos",
                                "orden": 7,
                                "valor": "7",
                                "pregunta": 26,
                                "dato": false
                            },
                            {
                                "id": 171,
                                "respuesta": "Gestión de Empresas Turísticas",
                                "orden": 8,
                                "valor": "8",
                                "pregunta": 26,
                                "dato": false
                            },
                            {
                                "id": 172,
                                "respuesta": "Automatización de procesos",
                                "orden": 9,
                                "valor": "9",
                                "pregunta": 26,
                                "dato": false
                            },
                            {
                                "id": 173,
                                "respuesta": "Estudio de mercadeo",
                                "orden": 10,
                                "valor": "10",
                                "pregunta": 26,
                                "dato": false
                            },
                            {
                                "id": 174,
                                "respuesta": "Plan estratégico de mercadeo",
                                "orden": 11,
                                "valor": "11",
                                "pregunta": 26,
                                "dato": false
                            },
                            {
                                "id": 175,
                                "respuesta": "Diseño de puntos de venta",
                                "orden": 12,
                                "valor": "12",
                                "pregunta": 26,
                                "dato": false
                            },
                            {
                                "id": 176,
                                "respuesta": "Estrategia de visibilización",
                                "orden": 13,
                                "valor": "13",
                                "pregunta": 26,
                                "dato": false
                            }
                        ],
                        "enunciado": "¿Qué tipo de proyecto?",
                        "imagen": null,
                        "tipo_pregunta": "M",
                        "dato": 0
                    },
                    "orden": 7,
                    "cuestionario": 1,
                    "dependencia_respuestas": [
                        163
                    ],
                    "enable": false
                },
                {
                    "id": 6,
                    "pregunta": {
                        "id": 2,
                        "opciones": [
                            {
                                "id": 3,
                                "respuesta": "Instagram",
                                "orden": 1,
                                "valor": "3",
                                "pregunta": 2,
                                "dato": false
                            },
                            {
                                "id": 1,
                                "respuesta": "Facebook",
                                "orden": 2,
                                "valor": "1",
                                "pregunta": 2,
                                "dato": false
                            },
                            {
                                "id": 2,
                                "respuesta": "Twitter",
                                "orden": 3,
                                "valor": "2",
                                "pregunta": 2,
                                "dato": false
                            }
                        ],
                        "enunciado": "¿Qué redes sociales necesitas?",
                        "imagen": null,
                        "tipo_pregunta": "M",
                        "dato": 0
                    },
                    "orden": 8,
                    "cuestionario": 1,
                    "dependencia_respuestas": [
                        123
                    ],
                    "enable": false
                },
                {
                    "id": 28,
                    "pregunta": {
                        "id": 24,
                        "opciones": [
                            {
                                "id": 125,
                                "respuesta": "Google Ads",
                                "orden": 1,
                                "valor": "1",
                                "pregunta": 24,
                                "dato": false
                            },
                            {
                                "id": 127,
                                "respuesta": "Facebook Ads",
                                "orden": 2,
                                "valor": "2",
                                "pregunta": 24,
                                "dato": false
                            },
                            {
                                "id": 129,
                                "respuesta": "Youtube Ads",
                                "orden": 3,
                                "valor": "3",
                                "pregunta": 24,
                                "dato": false
                            }
                        ],
                        "enunciado": "¿Qué herramientas de publicidad necesitas?",
                        "imagen": null,
                        "tipo_pregunta": "M",
                        "dato": 0
                    },
                    "orden": 12,
                    "cuestionario": 1,
                    "dependencia_respuestas": [
                        101
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
                            },
                            {
                                "id": 107,
                                "respuesta": "Mercado Libre",
                                "orden": 2,
                                "valor": "2",
                                "pregunta": 22,
                                "dato": false
                            },
                            {
                                "id": 109,
                                "respuesta": "OXL",
                                "orden": 3,
                                "valor": "3",
                                "pregunta": 22,
                                "dato": false
                            },
                            {
                                "id": 111,
                                "respuesta": "Wallapop",
                                "orden": 4,
                                "valor": "4",
                                "pregunta": 22,
                                "dato": false
                            },
                            {
                                "id": 113,
                                "respuesta": "TriVago",
                                "orden": 5,
                                "valor": "5",
                                "pregunta": 22,
                                "dato": false
                            },
                            {
                                "id": 115,
                                "respuesta": "Despegar",
                                "orden": 6,
                                "valor": "6",
                                "pregunta": 22,
                                "dato": false
                            },
                            {
                                "id": 117,
                                "respuesta": "Trip Advisor",
                                "orden": 7,
                                "valor": "7",
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
                            },
                            {
                                "id": 7,
                                "respuesta": "Entre $100.000 a $500.000",
                                "orden": 2,
                                "valor": "2",
                                "pregunta": 3,
                                "dato": false
                            },
                            {
                                "id": 8,
                                "respuesta": "Entre $500.000 y $1.000.000",
                                "orden": 3,
                                "valor": "3",
                                "pregunta": 3,
                                "dato": false
                            },
                            {
                                "id": 9,
                                "respuesta": "Entre $1.000.000 y $5.000.000",
                                "orden": 4,
                                "valor": "4",
                                "pregunta": 3,
                                "dato": false
                            },
                            {
                                "id": 119,
                                "respuesta": "Mas de $5.000.000",
                                "orden": 5,
                                "valor": "5",
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
        },
        {
            "id": 3,
            "preguntas": [
                {
                    "id": 8,
                    "pregunta": {
                        "id": 4,
                        "opciones": [
                            {
                                "id": 131,
                                "respuesta": "Bogota",
                                "orden": 1,
                                "valor": "(4.63083333333333,-74.0866666666667)",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 132,
                                "respuesta": "Boita",
                                "orden": 2,
                                "valor": "(5.02416666666667,-73.8355555555556)",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 95,
                                "respuesta": "Cajicá",
                                "orden": 2,
                                "valor": "(4.91861111111111,-74.0280555555556)\r\n",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 12,
                                "respuesta": "Chía",
                                "orden": 3,
                                "valor": "(4.85888888888889,-74.0586111111111)\r\n",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 133,
                                "respuesta": "Caqueza",
                                "orden": 3,
                                "valor": "(4.40555555555556,-73.9469444444445)",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 94,
                                "respuesta": "Tenjo",
                                "orden": 4,
                                "valor": "(4.87277777777778,-74.1444444444444)\r\n",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 134,
                                "respuesta": "Chipaque",
                                "orden": 4,
                                "valor": "(4.4425,-74.0441666666667)",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 135,
                                "respuesta": "Choachi",
                                "orden": 5,
                                "valor": "(4.52888888888889,-73.9227777777778)",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 136,
                                "respuesta": "Cogua",
                                "orden": 6,
                                "valor": "(5.06055555555556,-73.9791666666667)",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 10,
                                "respuesta": "Cota",
                                "orden": 6,
                                "valor": "(4.80944444444444,-74.0980555555556)\r\n",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 96,
                                "respuesta": "Subachoque",
                                "orden": 6,
                                "valor": "(4.92611111111111,-74.1730555555556)\r\n",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 97,
                                "respuesta": "Tabio",
                                "orden": 7,
                                "valor": "(4.91722222222222,-74.0936111111111)\r\n",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 137,
                                "respuesta": "El Rosal",
                                "orden": 7,
                                "valor": "(4.85305555555556,-74.26)",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 138,
                                "respuesta": "Facatativa",
                                "orden": 8,
                                "valor": "(4.81361111111111,-74.3544444444444)",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 139,
                                "respuesta": "Fomeque",
                                "orden": 9,
                                "valor": "(4.48805555555556,-73.8975)",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 140,
                                "respuesta": "Fosca",
                                "orden": 10,
                                "valor": "(4.33916666666667,-73.9386111111111)",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 141,
                                "respuesta": "Funza",
                                "orden": 11,
                                "valor": "(4.71638888888889,-74.2119444444444)",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 142,
                                "respuesta": "Fusagasuga",
                                "orden": 12,
                                "valor": "(4.33638888888889,-74.3638888888889)",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 143,
                                "respuesta": "Gachancipa",
                                "orden": 13,
                                "valor": "(4.99111111111111,-73.8716666666667)",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 98,
                                "respuesta": "Girardot",
                                "orden": 13,
                                "valor": "(4.29861111111111,-74.8047222222222)\r\n",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 144,
                                "respuesta": "Guayabetal",
                                "orden": 14,
                                "valor": "(4.21472222222222,-73.8172222222222)",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 145,
                                "respuesta": "Las Vegas",
                                "orden": 15,
                                "valor": "(5.06138888888889,-73.8222222222222)",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 11,
                                "respuesta": "Mosquera",
                                "orden": 16,
                                "valor": "(4.70583333333333,-74.2302777777778)\r\n",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 146,
                                "respuesta": "Madrid",
                                "orden": 16,
                                "valor": "(4.7325,-74.2641666666667)",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 147,
                                "respuesta": "Nemocon",
                                "orden": 17,
                                "valor": "(5.05,-73.8833333333333)",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 148,
                                "respuesta": "Nilo",
                                "orden": 18,
                                "valor": "(4.30611111111111,-74.6208333333333)",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 149,
                                "respuesta": "Nimaima",
                                "orden": 19,
                                "valor": "(5.12611111111111,-74.385)",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 150,
                                "respuesta": "Nocaima",
                                "orden": 20,
                                "valor": "(5.06972222222222,-74.3780555555555)",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 151,
                                "respuesta": "Pacho",
                                "orden": 21,
                                "valor": "(5.13277777777778,-74.1597222222222)",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 152,
                                "respuesta": "Quetame",
                                "orden": 22,
                                "valor": "(4.33222222222222,-73.8613888888889)",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 153,
                                "respuesta": "San Antonio del Tequendama",
                                "orden": 23,
                                "valor": "(4.61888888888889,-74.3538888888889)",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 154,
                                "respuesta": "San Francisco",
                                "orden": 24,
                                "valor": "(4.61666666666667,-74.8)",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 155,
                                "respuesta": "Sibate",
                                "orden": 25,
                                "valor": "(4.48416666666667,-74.245)",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 156,
                                "respuesta": "Soacha",
                                "orden": 26,
                                "valor": "(4.57944444444444,-74.2169444444445)",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 157,
                                "respuesta": "Sopo",
                                "orden": 27,
                                "valor": "(4.9075,-73.9383333333333)",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 158,
                                "respuesta": "Supata",
                                "orden": 28,
                                "valor": "(5.06083333333333,-74.2372222222222)",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 159,
                                "respuesta": "Tocaima",
                                "orden": 29,
                                "valor": "(4.45833333333333,-74.6344444444445)",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 160,
                                "respuesta": "Tocancipa",
                                "orden": 30,
                                "valor": "(4.96527777777778,-73.9130555555556)",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 161,
                                "respuesta": "Ubate",
                                "orden": 31,
                                "valor": "(5.30944444444444,-73.8158333333333)",
                                "pregunta": 4,
                                "dato": false
                            },
                            {
                                "id": 162,
                                "respuesta": "Une",
                                "orden": 32,
                                "valor": "(4.40305555555556,-74.0252777777778)",
                                "pregunta": 4,
                                "dato": false
                            }
                        ],
                        "enunciado": "¿Dónde estás Ubicado?",
                        "imagen": null,
                        "tipo_pregunta": "L",
                        "dato": 0
                    },
                    "orden": 0,
                    "cuestionario": 3,
                    "dependencia_respuestas": [

                    ],
                    "enable": false
                }
            ],
            "titulo": "¿Dónde te encuentras?",
            "descripcion": null,
            "imagen": "boton-donde.png",
            "fecha": null,
            "enable": false
        }
    ];


    beforeEach(inject(function (questionnaireService, $controller, $routeParams, $rootScope) {
        mockScope = $rootScope.$new();
        mockQuestionnaireService = questionnaireService;

        spyOn(mockQuestionnaireService, 'getQuestionnaires').and.returnValue(questionaires);

        spyOn(mockQuestionnaireService, 'getQuestionnaire').and.callFake(function(index){
            return questionaires[index];
        });


        $routeParams.idQuestionnaire = 0;
        mockController = $controller('QuestionsController', {
            $scope: mockScope,
            questionnaireService: mockQuestionnaireService
        });
    }));


    it('should verify that user has selected an answer', function () {
        mockScope.currentQuestion = {};
        var temp = mockScope.currentQuestion;
        mockScope.next();
        expect(mockScope.currentQuestion).not.toBe(temp)
    });

});


