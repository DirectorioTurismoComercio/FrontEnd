'use strict';

angular.module('Municipality')
    .controller('searchMunicipalityController', function ($scope, $log, $translate, MunicipalitiesDAO) {
        $scope.municipalitiesGroupedByLetter = [];
        $scope.search = {};

        MunicipalitiesDAO.getAllMunicipalities().then(function (municipalities) {
            $scope.municipalitiesGroupedByLetter = groupMunicipalitiesByLetter(municipalities);
        });

        tmp();

        function groupMunicipalitiesByLetter(municipalities) {
            var lastFoundLetter;
            var groupedMunicipalities = [];

            for (var i = 0; i < municipalities.length; i++) {
                const municipality = municipalities[i];
                var nameFirstLetter = municipality.nombre.charAt(0);

                if (lastFoundLetter != nameFirstLetter) {
                    lastFoundLetter = nameFirstLetter;
                    addNewGroup(groupedMunicipalities, lastFoundLetter);
                }

                addNewMunicipality(groupedMunicipalities, municipality);
            }

            return groupedMunicipalities;
        }

        function addNewGroup(array, letter) {
            array.push({
                letter: letter,
                visible:true,
                municipalities: []
            });
        }

        function addNewMunicipality(array, municipality) {
            municipality.visible = true;
            array[array.length - 1].municipalities.push(municipality);
        }

        $scope.getFirstLetter = function (municipality) {
            return municipality.nombre.charAt(0);
        };

        function tmp() {
            var t = [
                {
                    "id": 3004,
                    "categorias": [],
                    "fotos": [
                        {
                            "id": 3004,
                            "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                            "tipo": "P",
                            "sitio": 3004
                        }
                    ],
                    "rutas": [
                        {
                            "id": 41,
                            "sitios": [
                                {
                                    "id": 155,
                                    "sitio": {
                                        "id": 3004,
                                        "categorias": [],
                                        "fotos": [
                                            {
                                                "id": 3004,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "P",
                                                "sitio": 3004
                                            }
                                        ],
                                        "municipio": {
                                            "id": 3,
                                            "nombre": "Anapoima",
                                            "latitud": "4.565941800000000000",
                                            "longitud": "-74.564331300000000000"
                                        },
                                        "tags": [],
                                        "municipio_id": 3,
                                        "nombre": "Anapoima",
                                        "telefono": "423423423",
                                        "whatsapp": "",
                                        "horariolocal": "",
                                        "web": "",
                                        "latitud": "4.548056868005593000",
                                        "longitud": "-74.533878564834600000",
                                        "descripcion": "descripcion de Anapoima",
                                        "correolocal": "",
                                        "ubicacionlocal": "423423",
                                        "tipo_sitio": "M",
                                        "usuario": 3001
                                    },
                                    "sitio_id": 3004,
                                    "orden": 1,
                                    "ruta": 41
                                },
                                {
                                    "id": 156,
                                    "sitio": {
                                        "id": 3017,
                                        "categorias": [
                                            {
                                                "id": 111,
                                                "categoria": {
                                                    "id": 2,
                                                    "nombre": "Deportes",
                                                    "nivel": 1,
                                                    "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/deportes.png",
                                                    "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/deporte.png",
                                                    "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/deporte.png",
                                                    "categoria_padre": null
                                                },
                                                "categoria_id": 2,
                                                "tipo": 2,
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 112,
                                                "categoria": {
                                                    "id": 1,
                                                    "nombre": "Naturaleza",
                                                    "nivel": 1,
                                                    "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/naturaleza-agroturismo.png",
                                                    "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/naturaleza-agroturismo.png",
                                                    "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/naturaleza-agroturismo.png",
                                                    "categoria_padre": null
                                                },
                                                "categoria_id": 1,
                                                "tipo": 3,
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 110,
                                                "categoria": {
                                                    "id": 7,
                                                    "nombre": "Comercio",
                                                    "nivel": 1,
                                                    "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/comercio.png",
                                                    "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/comercio.png",
                                                    "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/comercio.png",
                                                    "categoria_padre": null
                                                },
                                                "categoria_id": 7,
                                                "tipo": 1,
                                                "sitio": 3017
                                            }
                                        ],
                                        "fotos": [
                                            {
                                                "id": 3020,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "PR",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3017,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "I",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3018,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "F",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3019,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "PR",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3021,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "PR",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3022,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "PR",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3023,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "P",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3024,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "PR",
                                                "sitio": 3017
                                            }
                                        ],
                                        "municipio": {
                                            "id": 3,
                                            "nombre": "Anapoima",
                                            "latitud": "4.565941800000000000",
                                            "longitud": "-74.564331300000000000"
                                        },
                                        "tags": [],
                                        "municipio_id": 3,
                                        "nombre": "pepe negocio 1",
                                        "telefono": "423423432",
                                        "whatsapp": "",
                                        "horariolocal": "",
                                        "web": "",
                                        "latitud": "4.548880386603274000",
                                        "longitud": "-74.535021185874940000",
                                        "descripcion": "423423432",
                                        "correolocal": "",
                                        "ubicacionlocal": "423432432",
                                        "tipo_sitio": "S",
                                        "usuario": 3003
                                    },
                                    "sitio_id": 3017,
                                    "orden": 2,
                                    "ruta": 41
                                }
                            ],
                            "nombre": "ruta nueva",
                            "descripcion": "432432",
                            "tiempo": "1 min",
                            "distancia": "0,2 km",
                            "sitio": 3004
                        },
                        {
                            "id": 35,
                            "sitios": [
                                {
                                    "id": 125,
                                    "sitio": {
                                        "id": 3017,
                                        "categorias": [
                                            {
                                                "id": 111,
                                                "categoria": {
                                                    "id": 2,
                                                    "nombre": "Deportes",
                                                    "nivel": 1,
                                                    "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/deportes.png",
                                                    "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/deporte.png",
                                                    "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/deporte.png",
                                                    "categoria_padre": null
                                                },
                                                "categoria_id": 2,
                                                "tipo": 2,
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 112,
                                                "categoria": {
                                                    "id": 1,
                                                    "nombre": "Naturaleza",
                                                    "nivel": 1,
                                                    "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/naturaleza-agroturismo.png",
                                                    "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/naturaleza-agroturismo.png",
                                                    "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/naturaleza-agroturismo.png",
                                                    "categoria_padre": null
                                                },
                                                "categoria_id": 1,
                                                "tipo": 3,
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 110,
                                                "categoria": {
                                                    "id": 7,
                                                    "nombre": "Comercio",
                                                    "nivel": 1,
                                                    "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/comercio.png",
                                                    "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/comercio.png",
                                                    "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/comercio.png",
                                                    "categoria_padre": null
                                                },
                                                "categoria_id": 7,
                                                "tipo": 1,
                                                "sitio": 3017
                                            }
                                        ],
                                        "fotos": [
                                            {
                                                "id": 3020,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "PR",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3017,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "I",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3018,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "F",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3019,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "PR",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3021,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "PR",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3022,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "PR",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3023,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "P",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3024,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "PR",
                                                "sitio": 3017
                                            }
                                        ],
                                        "municipio": {
                                            "id": 3,
                                            "nombre": "Anapoima",
                                            "latitud": "4.565941800000000000",
                                            "longitud": "-74.564331300000000000"
                                        },
                                        "tags": [],
                                        "municipio_id": 3,
                                        "nombre": "pepe negocio 1",
                                        "telefono": "423423432",
                                        "whatsapp": "",
                                        "horariolocal": "",
                                        "web": "",
                                        "latitud": "4.548880386603274000",
                                        "longitud": "-74.535021185874940000",
                                        "descripcion": "423423432",
                                        "correolocal": "",
                                        "ubicacionlocal": "423432432",
                                        "tipo_sitio": "S",
                                        "usuario": 3003
                                    },
                                    "sitio_id": 3017,
                                    "orden": 1,
                                    "ruta": 35
                                },
                                {
                                    "id": 126,
                                    "sitio": {
                                        "id": 3022,
                                        "categorias": [
                                            {
                                                "id": 121,
                                                "categoria": {
                                                    "id": 7,
                                                    "nombre": "Comercio",
                                                    "nivel": 1,
                                                    "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/comercio.png",
                                                    "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/comercio.png",
                                                    "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/comercio.png",
                                                    "categoria_padre": null
                                                },
                                                "categoria_id": 7,
                                                "tipo": 1,
                                                "sitio": 3022
                                            }
                                        ],
                                        "fotos": [
                                            {
                                                "id": 3054,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "P",
                                                "sitio": 3022
                                            }
                                        ],
                                        "municipio": {
                                            "id": 3,
                                            "nombre": "Anapoima",
                                            "latitud": "4.565941800000000000",
                                            "longitud": "-74.564331300000000000"
                                        },
                                        "tags": [],
                                        "municipio_id": 3,
                                        "nombre": "pepe1",
                                        "telefono": "2423432",
                                        "whatsapp": "",
                                        "horariolocal": "",
                                        "web": "",
                                        "latitud": "4.547933874887483000",
                                        "longitud": "-74.538116455078120000",
                                        "descripcion": "432432",
                                        "correolocal": "",
                                        "ubicacionlocal": "423432",
                                        "tipo_sitio": "S",
                                        "usuario": 3001
                                    },
                                    "sitio_id": 3022,
                                    "orden": 2,
                                    "ruta": 35
                                }
                            ],
                            "nombre": "ruta pepe",
                            "descripcion": "descripción pepe",
                            "tiempo": "3 min",
                            "distancia": "0,6 km",
                            "sitio": 3004
                        },
                        {
                            "id": 36,
                            "sitios": [
                                {
                                    "id": 127,
                                    "sitio": {
                                        "id": 3023,
                                        "categorias": [
                                            {
                                                "id": 122,
                                                "categoria": {
                                                    "id": 8,
                                                    "nombre": "Movilidad",
                                                    "nivel": 1,
                                                    "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/transporte.png",
                                                    "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/transporte.png",
                                                    "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/transporte.png",
                                                    "categoria_padre": null
                                                },
                                                "categoria_id": 8,
                                                "tipo": 1,
                                                "sitio": 3023
                                            }
                                        ],
                                        "fotos": [
                                            {
                                                "id": 3055,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "P",
                                                "sitio": 3023
                                            }
                                        ],
                                        "municipio": {
                                            "id": 3,
                                            "nombre": "Anapoima",
                                            "latitud": "4.565941800000000000",
                                            "longitud": "-74.564331300000000000"
                                        },
                                        "tags": [],
                                        "municipio_id": 3,
                                        "nombre": "pepe2",
                                        "telefono": "42342323",
                                        "whatsapp": "",
                                        "horariolocal": "",
                                        "web": "",
                                        "latitud": "4.551014044043378000",
                                        "longitud": "-74.535713195800780000",
                                        "descripcion": "fsdfsd",
                                        "correolocal": "",
                                        "ubicacionlocal": "423432",
                                        "tipo_sitio": "S",
                                        "usuario": 3001
                                    },
                                    "sitio_id": 3023,
                                    "orden": 1,
                                    "ruta": 36
                                },
                                {
                                    "id": 128,
                                    "sitio": {
                                        "id": 3025,
                                        "categorias": [
                                            {
                                                "id": 124,
                                                "categoria": {
                                                    "id": 7,
                                                    "nombre": "Comercio",
                                                    "nivel": 1,
                                                    "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/comercio.png",
                                                    "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/comercio.png",
                                                    "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/comercio.png",
                                                    "categoria_padre": null
                                                },
                                                "categoria_id": 7,
                                                "tipo": 1,
                                                "sitio": 3025
                                            }
                                        ],
                                        "fotos": [
                                            {
                                                "id": 3057,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "P",
                                                "sitio": 3025
                                            }
                                        ],
                                        "municipio": {
                                            "id": 3,
                                            "nombre": "Anapoima",
                                            "latitud": "4.565941800000000000",
                                            "longitud": "-74.564331300000000000"
                                        },
                                        "tags": [],
                                        "municipio_id": 3,
                                        "nombre": "pepe5",
                                        "telefono": "42342332",
                                        "whatsapp": "",
                                        "horariolocal": "",
                                        "web": "",
                                        "latitud": "4.549907109769731000",
                                        "longitud": "-74.535021185874940000",
                                        "descripcion": "gdfgfd",
                                        "correolocal": "",
                                        "ubicacionlocal": "543543",
                                        "tipo_sitio": "S",
                                        "usuario": 3001
                                    },
                                    "sitio_id": 3025,
                                    "orden": 2,
                                    "ruta": 36
                                }
                            ],
                            "nombre": "pepe2",
                            "descripcion": "descripocion pepe2",
                            "tiempo": "2 min",
                            "distancia": "0,5 km",
                            "sitio": 3004
                        },
                        {
                            "id": 39,
                            "sitios": [
                                {
                                    "id": 134,
                                    "sitio": {
                                        "id": 3024,
                                        "categorias": [
                                            {
                                                "id": 126,
                                                "categoria": {
                                                    "id": 7,
                                                    "nombre": "Comercio",
                                                    "nivel": 1,
                                                    "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/comercio.png",
                                                    "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/comercio.png",
                                                    "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/comercio.png",
                                                    "categoria_padre": null
                                                },
                                                "categoria_id": 7,
                                                "tipo": 1,
                                                "sitio": 3024
                                            }
                                        ],
                                        "fotos": [
                                            {
                                                "id": 3059,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "P",
                                                "sitio": 3024
                                            }
                                        ],
                                        "municipio": {
                                            "id": 3,
                                            "nombre": "Anapoima",
                                            "latitud": "4.565941800000000000",
                                            "longitud": "-74.564331300000000000"
                                        },
                                        "tags": [],
                                        "municipio_id": 3,
                                        "nombre": "peep3",
                                        "telefono": "534534534",
                                        "whatsapp": "",
                                        "horariolocal": "",
                                        "web": "",
                                        "latitud": "4.546142451003960000",
                                        "longitud": "-74.532617926597600000",
                                        "descripcion": "534534543",
                                        "correolocal": "",
                                        "ubicacionlocal": "345435",
                                        "tipo_sitio": "S",
                                        "usuario": 3001
                                    },
                                    "sitio_id": 3024,
                                    "orden": 1,
                                    "ruta": 39
                                },
                                {
                                    "id": 135,
                                    "sitio": {
                                        "id": 3017,
                                        "categorias": [
                                            {
                                                "id": 111,
                                                "categoria": {
                                                    "id": 2,
                                                    "nombre": "Deportes",
                                                    "nivel": 1,
                                                    "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/deportes.png",
                                                    "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/deporte.png",
                                                    "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/deporte.png",
                                                    "categoria_padre": null
                                                },
                                                "categoria_id": 2,
                                                "tipo": 2,
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 112,
                                                "categoria": {
                                                    "id": 1,
                                                    "nombre": "Naturaleza",
                                                    "nivel": 1,
                                                    "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/naturaleza-agroturismo.png",
                                                    "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/naturaleza-agroturismo.png",
                                                    "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/naturaleza-agroturismo.png",
                                                    "categoria_padre": null
                                                },
                                                "categoria_id": 1,
                                                "tipo": 3,
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 110,
                                                "categoria": {
                                                    "id": 7,
                                                    "nombre": "Comercio",
                                                    "nivel": 1,
                                                    "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/comercio.png",
                                                    "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/comercio.png",
                                                    "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/comercio.png",
                                                    "categoria_padre": null
                                                },
                                                "categoria_id": 7,
                                                "tipo": 1,
                                                "sitio": 3017
                                            }
                                        ],
                                        "fotos": [
                                            {
                                                "id": 3020,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "PR",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3017,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "I",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3018,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "F",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3019,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "PR",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3021,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "PR",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3022,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "PR",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3023,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "P",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3024,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "PR",
                                                "sitio": 3017
                                            }
                                        ],
                                        "municipio": {
                                            "id": 3,
                                            "nombre": "Anapoima",
                                            "latitud": "4.565941800000000000",
                                            "longitud": "-74.564331300000000000"
                                        },
                                        "tags": [],
                                        "municipio_id": 3,
                                        "nombre": "pepe negocio 1",
                                        "telefono": "423423432",
                                        "whatsapp": "",
                                        "horariolocal": "",
                                        "web": "",
                                        "latitud": "4.548880386603274000",
                                        "longitud": "-74.535021185874940000",
                                        "descripcion": "423423432",
                                        "correolocal": "",
                                        "ubicacionlocal": "423432432",
                                        "tipo_sitio": "S",
                                        "usuario": 3003
                                    },
                                    "sitio_id": 3017,
                                    "orden": 2,
                                    "ruta": 39
                                }
                            ],
                            "nombre": "pepe3",
                            "descripcion": "432432",
                            "tiempo": "1 min",
                            "distancia": "0,2 km",
                            "sitio": 3004
                        },
                        {
                            "id": 40,
                            "sitios": [
                                {
                                    "id": 150,
                                    "sitio": {
                                        "id": 3017,
                                        "categorias": [
                                            {
                                                "id": 111,
                                                "categoria": {
                                                    "id": 2,
                                                    "nombre": "Deportes",
                                                    "nivel": 1,
                                                    "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/deportes.png",
                                                    "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/deporte.png",
                                                    "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/deporte.png",
                                                    "categoria_padre": null
                                                },
                                                "categoria_id": 2,
                                                "tipo": 2,
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 112,
                                                "categoria": {
                                                    "id": 1,
                                                    "nombre": "Naturaleza",
                                                    "nivel": 1,
                                                    "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/naturaleza-agroturismo.png",
                                                    "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/naturaleza-agroturismo.png",
                                                    "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/naturaleza-agroturismo.png",
                                                    "categoria_padre": null
                                                },
                                                "categoria_id": 1,
                                                "tipo": 3,
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 110,
                                                "categoria": {
                                                    "id": 7,
                                                    "nombre": "Comercio",
                                                    "nivel": 1,
                                                    "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/comercio.png",
                                                    "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/comercio.png",
                                                    "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/comercio.png",
                                                    "categoria_padre": null
                                                },
                                                "categoria_id": 7,
                                                "tipo": 1,
                                                "sitio": 3017
                                            }
                                        ],
                                        "fotos": [
                                            {
                                                "id": 3020,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "PR",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3017,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "I",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3018,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "F",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3019,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "PR",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3021,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "PR",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3022,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "PR",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3023,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "P",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3024,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "PR",
                                                "sitio": 3017
                                            }
                                        ],
                                        "municipio": {
                                            "id": 3,
                                            "nombre": "Anapoima",
                                            "latitud": "4.565941800000000000",
                                            "longitud": "-74.564331300000000000"
                                        },
                                        "tags": [],
                                        "municipio_id": 3,
                                        "nombre": "pepe negocio 1",
                                        "telefono": "423423432",
                                        "whatsapp": "",
                                        "horariolocal": "",
                                        "web": "",
                                        "latitud": "4.548880386603274000",
                                        "longitud": "-74.535021185874940000",
                                        "descripcion": "423423432",
                                        "correolocal": "",
                                        "ubicacionlocal": "423432432",
                                        "tipo_sitio": "S",
                                        "usuario": 3003
                                    },
                                    "sitio_id": 3017,
                                    "orden": 1,
                                    "ruta": 40
                                },
                                {
                                    "id": 151,
                                    "sitio": {
                                        "id": 3004,
                                        "categorias": [],
                                        "fotos": [
                                            {
                                                "id": 3004,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "P",
                                                "sitio": 3004
                                            }
                                        ],
                                        "municipio": {
                                            "id": 3,
                                            "nombre": "Anapoima",
                                            "latitud": "4.565941800000000000",
                                            "longitud": "-74.564331300000000000"
                                        },
                                        "tags": [],
                                        "municipio_id": 3,
                                        "nombre": "Anapoima",
                                        "telefono": "423423423",
                                        "whatsapp": "",
                                        "horariolocal": "",
                                        "web": "",
                                        "latitud": "4.548056868005593000",
                                        "longitud": "-74.533878564834600000",
                                        "descripcion": "descripcion de Anapoima",
                                        "correolocal": "",
                                        "ubicacionlocal": "423423",
                                        "tipo_sitio": "M",
                                        "usuario": 3001
                                    },
                                    "sitio_id": 3004,
                                    "orden": 2,
                                    "ruta": 40
                                },
                                {
                                    "id": 152,
                                    "sitio": {
                                        "id": 3022,
                                        "categorias": [
                                            {
                                                "id": 121,
                                                "categoria": {
                                                    "id": 7,
                                                    "nombre": "Comercio",
                                                    "nivel": 1,
                                                    "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/comercio.png",
                                                    "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/comercio.png",
                                                    "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/comercio.png",
                                                    "categoria_padre": null
                                                },
                                                "categoria_id": 7,
                                                "tipo": 1,
                                                "sitio": 3022
                                            }
                                        ],
                                        "fotos": [
                                            {
                                                "id": 3054,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "P",
                                                "sitio": 3022
                                            }
                                        ],
                                        "municipio": {
                                            "id": 3,
                                            "nombre": "Anapoima",
                                            "latitud": "4.565941800000000000",
                                            "longitud": "-74.564331300000000000"
                                        },
                                        "tags": [],
                                        "municipio_id": 3,
                                        "nombre": "pepe1",
                                        "telefono": "2423432",
                                        "whatsapp": "",
                                        "horariolocal": "",
                                        "web": "",
                                        "latitud": "4.547933874887483000",
                                        "longitud": "-74.538116455078120000",
                                        "descripcion": "432432",
                                        "correolocal": "",
                                        "ubicacionlocal": "423432",
                                        "tipo_sitio": "S",
                                        "usuario": 3001
                                    },
                                    "sitio_id": 3022,
                                    "orden": 3,
                                    "ruta": 40
                                },
                                {
                                    "id": 153,
                                    "sitio": {
                                        "id": 3023,
                                        "categorias": [
                                            {
                                                "id": 122,
                                                "categoria": {
                                                    "id": 8,
                                                    "nombre": "Movilidad",
                                                    "nivel": 1,
                                                    "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/transporte.png",
                                                    "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/transporte.png",
                                                    "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/transporte.png",
                                                    "categoria_padre": null
                                                },
                                                "categoria_id": 8,
                                                "tipo": 1,
                                                "sitio": 3023
                                            }
                                        ],
                                        "fotos": [
                                            {
                                                "id": 3055,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "P",
                                                "sitio": 3023
                                            }
                                        ],
                                        "municipio": {
                                            "id": 3,
                                            "nombre": "Anapoima",
                                            "latitud": "4.565941800000000000",
                                            "longitud": "-74.564331300000000000"
                                        },
                                        "tags": [],
                                        "municipio_id": 3,
                                        "nombre": "pepe2",
                                        "telefono": "42342323",
                                        "whatsapp": "",
                                        "horariolocal": "",
                                        "web": "",
                                        "latitud": "4.551014044043378000",
                                        "longitud": "-74.535713195800780000",
                                        "descripcion": "fsdfsd",
                                        "correolocal": "",
                                        "ubicacionlocal": "423432",
                                        "tipo_sitio": "S",
                                        "usuario": 3001
                                    },
                                    "sitio_id": 3023,
                                    "orden": 4,
                                    "ruta": 40
                                },
                                {
                                    "id": 154,
                                    "sitio": {
                                        "id": 3004,
                                        "categorias": [],
                                        "fotos": [
                                            {
                                                "id": 3004,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "P",
                                                "sitio": 3004
                                            }
                                        ],
                                        "municipio": {
                                            "id": 3,
                                            "nombre": "Anapoima",
                                            "latitud": "4.565941800000000000",
                                            "longitud": "-74.564331300000000000"
                                        },
                                        "tags": [],
                                        "municipio_id": 3,
                                        "nombre": "Anapoima",
                                        "telefono": "423423423",
                                        "whatsapp": "",
                                        "horariolocal": "",
                                        "web": "",
                                        "latitud": "4.548056868005593000",
                                        "longitud": "-74.533878564834600000",
                                        "descripcion": "descripcion de Anapoima",
                                        "correolocal": "",
                                        "ubicacionlocal": "423423",
                                        "tipo_sitio": "M",
                                        "usuario": 3001
                                    },
                                    "sitio_id": 3004,
                                    "orden": 5,
                                    "ruta": 40
                                }
                            ],
                            "nombre": "pepe zindex",
                            "descripcion": "53534",
                            "tiempo": "3 min",
                            "distancia": "0,2 km",
                            "sitio": 3004
                        },
                        {
                            "id": 42,
                            "sitios": [
                                {
                                    "id": 157,
                                    "sitio": {
                                        "id": 3024,
                                        "categorias": [
                                            {
                                                "id": 126,
                                                "categoria": {
                                                    "id": 7,
                                                    "nombre": "Comercio",
                                                    "nivel": 1,
                                                    "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/comercio.png",
                                                    "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/comercio.png",
                                                    "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/comercio.png",
                                                    "categoria_padre": null
                                                },
                                                "categoria_id": 7,
                                                "tipo": 1,
                                                "sitio": 3024
                                            }
                                        ],
                                        "fotos": [
                                            {
                                                "id": 3059,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "P",
                                                "sitio": 3024
                                            }
                                        ],
                                        "municipio": {
                                            "id": 3,
                                            "nombre": "Anapoima",
                                            "latitud": "4.565941800000000000",
                                            "longitud": "-74.564331300000000000"
                                        },
                                        "tags": [],
                                        "municipio_id": 3,
                                        "nombre": "peep3",
                                        "telefono": "534534534",
                                        "whatsapp": "",
                                        "horariolocal": "",
                                        "web": "",
                                        "latitud": "4.546142451003960000",
                                        "longitud": "-74.532617926597600000",
                                        "descripcion": "534534543",
                                        "correolocal": "",
                                        "ubicacionlocal": "345435",
                                        "tipo_sitio": "S",
                                        "usuario": 3001
                                    },
                                    "sitio_id": 3024,
                                    "orden": 1,
                                    "ruta": 42
                                },
                                {
                                    "id": 158,
                                    "sitio": {
                                        "id": 3017,
                                        "categorias": [
                                            {
                                                "id": 111,
                                                "categoria": {
                                                    "id": 2,
                                                    "nombre": "Deportes",
                                                    "nivel": 1,
                                                    "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/deportes.png",
                                                    "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/deporte.png",
                                                    "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/deporte.png",
                                                    "categoria_padre": null
                                                },
                                                "categoria_id": 2,
                                                "tipo": 2,
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 112,
                                                "categoria": {
                                                    "id": 1,
                                                    "nombre": "Naturaleza",
                                                    "nivel": 1,
                                                    "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/naturaleza-agroturismo.png",
                                                    "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/naturaleza-agroturismo.png",
                                                    "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/naturaleza-agroturismo.png",
                                                    "categoria_padre": null
                                                },
                                                "categoria_id": 1,
                                                "tipo": 3,
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 110,
                                                "categoria": {
                                                    "id": 7,
                                                    "nombre": "Comercio",
                                                    "nivel": 1,
                                                    "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/comercio.png",
                                                    "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/comercio.png",
                                                    "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/comercio.png",
                                                    "categoria_padre": null
                                                },
                                                "categoria_id": 7,
                                                "tipo": 1,
                                                "sitio": 3017
                                            }
                                        ],
                                        "fotos": [
                                            {
                                                "id": 3020,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "PR",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3017,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "I",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3018,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "F",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3019,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "PR",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3021,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "PR",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3022,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "PR",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3023,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "P",
                                                "sitio": 3017
                                            },
                                            {
                                                "id": 3024,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "PR",
                                                "sitio": 3017
                                            }
                                        ],
                                        "municipio": {
                                            "id": 3,
                                            "nombre": "Anapoima",
                                            "latitud": "4.565941800000000000",
                                            "longitud": "-74.564331300000000000"
                                        },
                                        "tags": [],
                                        "municipio_id": 3,
                                        "nombre": "pepe negocio 1",
                                        "telefono": "423423432",
                                        "whatsapp": "",
                                        "horariolocal": "",
                                        "web": "",
                                        "latitud": "4.548880386603274000",
                                        "longitud": "-74.535021185874940000",
                                        "descripcion": "423423432",
                                        "correolocal": "",
                                        "ubicacionlocal": "423432432",
                                        "tipo_sitio": "S",
                                        "usuario": 3003
                                    },
                                    "sitio_id": 3017,
                                    "orden": 2,
                                    "ruta": 42
                                }
                            ],
                            "nombre": "a",
                            "descripcion": "23423423",
                            "tiempo": "1 min",
                            "distancia": "0,2 km",
                            "sitio": 3004
                        },
                        {
                            "id": 43,
                            "sitios": [
                                {
                                    "id": 159,
                                    "sitio": {
                                        "id": 3023,
                                        "categorias": [
                                            {
                                                "id": 122,
                                                "categoria": {
                                                    "id": 8,
                                                    "nombre": "Movilidad",
                                                    "nivel": 1,
                                                    "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/transporte.png",
                                                    "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/transporte.png",
                                                    "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/transporte.png",
                                                    "categoria_padre": null
                                                },
                                                "categoria_id": 8,
                                                "tipo": 1,
                                                "sitio": 3023
                                            }
                                        ],
                                        "fotos": [
                                            {
                                                "id": 3055,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "P",
                                                "sitio": 3023
                                            }
                                        ],
                                        "municipio": {
                                            "id": 3,
                                            "nombre": "Anapoima",
                                            "latitud": "4.565941800000000000",
                                            "longitud": "-74.564331300000000000"
                                        },
                                        "tags": [],
                                        "municipio_id": 3,
                                        "nombre": "pepe2",
                                        "telefono": "42342323",
                                        "whatsapp": "",
                                        "horariolocal": "",
                                        "web": "",
                                        "latitud": "4.551014044043378000",
                                        "longitud": "-74.535713195800780000",
                                        "descripcion": "fsdfsd",
                                        "correolocal": "",
                                        "ubicacionlocal": "423432",
                                        "tipo_sitio": "S",
                                        "usuario": 3001
                                    },
                                    "sitio_id": 3023,
                                    "orden": 1,
                                    "ruta": 43
                                },
                                {
                                    "id": 160,
                                    "sitio": {
                                        "id": 3023,
                                        "categorias": [
                                            {
                                                "id": 122,
                                                "categoria": {
                                                    "id": 8,
                                                    "nombre": "Movilidad",
                                                    "nivel": 1,
                                                    "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/transporte.png",
                                                    "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/transporte.png",
                                                    "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/transporte.png",
                                                    "categoria_padre": null
                                                },
                                                "categoria_id": 8,
                                                "tipo": 1,
                                                "sitio": 3023
                                            }
                                        ],
                                        "fotos": [
                                            {
                                                "id": 3055,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "P",
                                                "sitio": 3023
                                            }
                                        ],
                                        "municipio": {
                                            "id": 3,
                                            "nombre": "Anapoima",
                                            "latitud": "4.565941800000000000",
                                            "longitud": "-74.564331300000000000"
                                        },
                                        "tags": [],
                                        "municipio_id": 3,
                                        "nombre": "pepe2",
                                        "telefono": "42342323",
                                        "whatsapp": "",
                                        "horariolocal": "",
                                        "web": "",
                                        "latitud": "4.551014044043378000",
                                        "longitud": "-74.535713195800780000",
                                        "descripcion": "fsdfsd",
                                        "correolocal": "",
                                        "ubicacionlocal": "423432",
                                        "tipo_sitio": "S",
                                        "usuario": 3001
                                    },
                                    "sitio_id": 3023,
                                    "orden": 2,
                                    "ruta": 43
                                }
                            ],
                            "nombre": "z",
                            "descripcion": "534543",
                            "tiempo": "1 min",
                            "distancia": "1 m",
                            "sitio": 3004
                        },
                        {
                            "id": 44,
                            "sitios": [
                                {
                                    "id": 161,
                                    "sitio": {
                                        "id": 3004,
                                        "categorias": [],
                                        "fotos": [
                                            {
                                                "id": 3004,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "P",
                                                "sitio": 3004
                                            }
                                        ],
                                        "municipio": {
                                            "id": 3,
                                            "nombre": "Anapoima",
                                            "latitud": "4.565941800000000000",
                                            "longitud": "-74.564331300000000000"
                                        },
                                        "tags": [],
                                        "municipio_id": 3,
                                        "nombre": "Anapoima",
                                        "telefono": "423423423",
                                        "whatsapp": "",
                                        "horariolocal": "",
                                        "web": "",
                                        "latitud": "4.548056868005593000",
                                        "longitud": "-74.533878564834600000",
                                        "descripcion": "descripcion de Anapoima",
                                        "correolocal": "",
                                        "ubicacionlocal": "423423",
                                        "tipo_sitio": "M",
                                        "usuario": 3001
                                    },
                                    "sitio_id": 3004,
                                    "orden": 1,
                                    "ruta": 44
                                },
                                {
                                    "id": 162,
                                    "sitio": {
                                        "id": 3022,
                                        "categorias": [
                                            {
                                                "id": 121,
                                                "categoria": {
                                                    "id": 7,
                                                    "nombre": "Comercio",
                                                    "nivel": 1,
                                                    "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/comercio.png",
                                                    "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/comercio.png",
                                                    "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/comercio.png",
                                                    "categoria_padre": null
                                                },
                                                "categoria_id": 7,
                                                "tipo": 1,
                                                "sitio": 3022
                                            }
                                        ],
                                        "fotos": [
                                            {
                                                "id": 3054,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "P",
                                                "sitio": 3022
                                            }
                                        ],
                                        "municipio": {
                                            "id": 3,
                                            "nombre": "Anapoima",
                                            "latitud": "4.565941800000000000",
                                            "longitud": "-74.564331300000000000"
                                        },
                                        "tags": [],
                                        "municipio_id": 3,
                                        "nombre": "pepe1",
                                        "telefono": "2423432",
                                        "whatsapp": "",
                                        "horariolocal": "",
                                        "web": "",
                                        "latitud": "4.547933874887483000",
                                        "longitud": "-74.538116455078120000",
                                        "descripcion": "432432",
                                        "correolocal": "",
                                        "ubicacionlocal": "423432",
                                        "tipo_sitio": "S",
                                        "usuario": 3001
                                    },
                                    "sitio_id": 3022,
                                    "orden": 2,
                                    "ruta": 44
                                }
                            ],
                            "nombre": "otra ruta",
                            "descripcion": "423423",
                            "tiempo": "4 min",
                            "distancia": "0,7 km",
                            "sitio": 3004
                        }
                    ],
                    "municipio": {
                        "id": 3,
                        "nombre": "Anapoima",
                        "latitud": "4.565941800000000000",
                        "longitud": "-74.564331300000000000"
                    },
                    "tags": [],
                    "municipio_id": 3,
                    "nombre": "Anapoima",
                    "telefono": "423423423",
                    "whatsapp": "",
                    "horariolocal": "",
                    "web": "",
                    "latitud": "4.548056868005593000",
                    "longitud": "-74.533878564834600000",
                    "descripcion": "descripcion de Anapoima",
                    "correolocal": "",
                    "ubicacionlocal": "423423",
                    "tipo_sitio": "M",
                    "usuario": 3001
                },
                {
                    "id": 3016,
                    "categorias": [],
                    "fotos": [
                        {
                            "id": 3016,
                            "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                            "tipo": "P",
                            "sitio": 3016
                        }
                    ],
                    "rutas": [],
                    "municipio": {
                        "id": 4,
                        "nombre": "Anolaima",
                        "latitud": "4.787346600000000000",
                        "longitud": "-74.494132700000000000"
                    },
                    "tags": [],
                    "municipio_id": 4,
                    "nombre": "Anolaima",
                    "telefono": "423423423",
                    "whatsapp": "",
                    "horariolocal": "",
                    "web": "",
                    "latitud": "4.761722526236129000",
                    "longitud": "-74.463266730308530000",
                    "descripcion": "42423423",
                    "correolocal": "",
                    "ubicacionlocal": "423423432",
                    "tipo_sitio": "M",
                    "usuario": 3002
                },
                {
                    "id": 3020,
                    "categorias": [],
                    "fotos": [
                        {
                            "id": 3046,
                            "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                            "tipo": "P",
                            "sitio": 3020
                        },
                        {
                            "id": 3045,
                            "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                            "tipo": "F",
                            "sitio": 3020
                        },
                        {
                            "id": 3044,
                            "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                            "tipo": "F",
                            "sitio": 3020
                        },
                        {
                            "id": 3043,
                            "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                            "tipo": "F",
                            "sitio": 3020
                        },
                        {
                            "id": 3042,
                            "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                            "tipo": "F",
                            "sitio": 3020
                        },
                        {
                            "id": 3041,
                            "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                            "tipo": "I",
                            "sitio": 3020
                        }
                    ],
                    "rutas": [
                        {
                            "id": 28,
                            "sitios": [
                                {
                                    "id": 96,
                                    "sitio": {
                                        "id": 3021,
                                        "categorias": [
                                            {
                                                "id": 120,
                                                "categoria": {
                                                    "id": 2,
                                                    "nombre": "Deportes",
                                                    "nivel": 1,
                                                    "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/deportes.png",
                                                    "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/deporte.png",
                                                    "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/deporte.png",
                                                    "categoria_padre": null
                                                },
                                                "categoria_id": 2,
                                                "tipo": 3,
                                                "sitio": 3021
                                            },
                                            {
                                                "id": 119,
                                                "categoria": {
                                                    "id": 7,
                                                    "nombre": "Comercio",
                                                    "nivel": 1,
                                                    "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/comercio.png",
                                                    "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/comercio.png",
                                                    "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/comercio.png",
                                                    "categoria_padre": null
                                                },
                                                "categoria_id": 7,
                                                "tipo": 2,
                                                "sitio": 3021
                                            },
                                            {
                                                "id": 118,
                                                "categoria": {
                                                    "id": 5,
                                                    "nombre": "Comida y Bebida",
                                                    "nivel": 1,
                                                    "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/comida-bebida.png",
                                                    "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/comida-bebida.png",
                                                    "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/comida-bebida.png",
                                                    "categoria_padre": null
                                                },
                                                "categoria_id": 5,
                                                "tipo": 1,
                                                "sitio": 3021
                                            }
                                        ],
                                        "fotos": [
                                            {
                                                "id": 3053,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "PR",
                                                "sitio": 3021
                                            },
                                            {
                                                "id": 3052,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "P",
                                                "sitio": 3021
                                            },
                                            {
                                                "id": 3051,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "PR",
                                                "sitio": 3021
                                            },
                                            {
                                                "id": 3050,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "PR",
                                                "sitio": 3021
                                            },
                                            {
                                                "id": 3049,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "PR",
                                                "sitio": 3021
                                            },
                                            {
                                                "id": 3048,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "F",
                                                "sitio": 3021
                                            },
                                            {
                                                "id": 3047,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "I",
                                                "sitio": 3021
                                            }
                                        ],
                                        "municipio": {
                                            "id": 23,
                                            "nombre": "Cota",
                                            "latitud": "4.809444444444440000",
                                            "longitud": "-74.098055555555600000"
                                        },
                                        "tags": [],
                                        "municipio_id": 23,
                                        "nombre": "423423",
                                        "telefono": "423423423",
                                        "whatsapp": "",
                                        "horariolocal": "",
                                        "web": "",
                                        "latitud": "4.808251686577228000",
                                        "longitud": "-74.094881415367130000",
                                        "descripcion": "423423432",
                                        "correolocal": "",
                                        "ubicacionlocal": "423423",
                                        "tipo_sitio": "S",
                                        "usuario": 3004
                                    },
                                    "sitio_id": 3021,
                                    "orden": 1,
                                    "ruta": 28
                                },
                                {
                                    "id": 97,
                                    "sitio": {
                                        "id": 3020,
                                        "categorias": [],
                                        "fotos": [
                                            {
                                                "id": 3046,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "P",
                                                "sitio": 3020
                                            },
                                            {
                                                "id": 3045,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "F",
                                                "sitio": 3020
                                            },
                                            {
                                                "id": 3044,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "F",
                                                "sitio": 3020
                                            },
                                            {
                                                "id": 3043,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "F",
                                                "sitio": 3020
                                            },
                                            {
                                                "id": 3042,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "F",
                                                "sitio": 3020
                                            },
                                            {
                                                "id": 3041,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "I",
                                                "sitio": 3020
                                            }
                                        ],
                                        "municipio": {
                                            "id": 23,
                                            "nombre": "Cota",
                                            "latitud": "4.809444444444440000",
                                            "longitud": "-74.098055555555600000"
                                        },
                                        "tags": [],
                                        "municipio_id": 23,
                                        "nombre": "Cota",
                                        "telefono": "53534534",
                                        "whatsapp": "",
                                        "horariolocal": "",
                                        "web": "",
                                        "latitud": "4.810304370673903000",
                                        "longitud": "-74.092134833335880000",
                                        "descripcion": "rwrwrew",
                                        "correolocal": "",
                                        "ubicacionlocal": "534534",
                                        "tipo_sitio": "M",
                                        "usuario": 3004
                                    },
                                    "sitio_id": 3020,
                                    "orden": 2,
                                    "ruta": 28
                                }
                            ],
                            "nombre": "42343",
                            "descripcion": "423423",
                            "tiempo": "7 min",
                            "distancia": "2,5 km",
                            "sitio": 3020
                        },
                        {
                            "id": 29,
                            "sitios": [
                                {
                                    "id": 94,
                                    "sitio": {
                                        "id": 3020,
                                        "categorias": [],
                                        "fotos": [
                                            {
                                                "id": 3046,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "P",
                                                "sitio": 3020
                                            },
                                            {
                                                "id": 3045,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "F",
                                                "sitio": 3020
                                            },
                                            {
                                                "id": 3044,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "F",
                                                "sitio": 3020
                                            },
                                            {
                                                "id": 3043,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "F",
                                                "sitio": 3020
                                            },
                                            {
                                                "id": 3042,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "F",
                                                "sitio": 3020
                                            },
                                            {
                                                "id": 3041,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "I",
                                                "sitio": 3020
                                            }
                                        ],
                                        "municipio": {
                                            "id": 23,
                                            "nombre": "Cota",
                                            "latitud": "4.809444444444440000",
                                            "longitud": "-74.098055555555600000"
                                        },
                                        "tags": [],
                                        "municipio_id": 23,
                                        "nombre": "Cota",
                                        "telefono": "53534534",
                                        "whatsapp": "",
                                        "horariolocal": "",
                                        "web": "",
                                        "latitud": "4.810304370673903000",
                                        "longitud": "-74.092134833335880000",
                                        "descripcion": "rwrwrew",
                                        "correolocal": "",
                                        "ubicacionlocal": "534534",
                                        "tipo_sitio": "M",
                                        "usuario": 3004
                                    },
                                    "sitio_id": 3020,
                                    "orden": 1,
                                    "ruta": 29
                                },
                                {
                                    "id": 95,
                                    "sitio": {
                                        "id": 3021,
                                        "categorias": [
                                            {
                                                "id": 120,
                                                "categoria": {
                                                    "id": 2,
                                                    "nombre": "Deportes",
                                                    "nivel": 1,
                                                    "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/deportes.png",
                                                    "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/deporte.png",
                                                    "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/deporte.png",
                                                    "categoria_padre": null
                                                },
                                                "categoria_id": 2,
                                                "tipo": 3,
                                                "sitio": 3021
                                            },
                                            {
                                                "id": 119,
                                                "categoria": {
                                                    "id": 7,
                                                    "nombre": "Comercio",
                                                    "nivel": 1,
                                                    "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/comercio.png",
                                                    "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/comercio.png",
                                                    "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/comercio.png",
                                                    "categoria_padre": null
                                                },
                                                "categoria_id": 7,
                                                "tipo": 2,
                                                "sitio": 3021
                                            },
                                            {
                                                "id": 118,
                                                "categoria": {
                                                    "id": 5,
                                                    "nombre": "Comida y Bebida",
                                                    "nivel": 1,
                                                    "URL_icono_general": "http://ecosistema.desarrollo.com:8000/Fotos/general_icons/comida-bebida.png",
                                                    "URL_icono_normal": "http://ecosistema.desarrollo.com:8000/Fotos/normal_icons/comida-bebida.png",
                                                    "URL_icono_seleccionado": "http://ecosistema.desarrollo.com:8000/Fotos/selected_icons/comida-bebida.png",
                                                    "categoria_padre": null
                                                },
                                                "categoria_id": 5,
                                                "tipo": 1,
                                                "sitio": 3021
                                            }
                                        ],
                                        "fotos": [
                                            {
                                                "id": 3053,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "PR",
                                                "sitio": 3021
                                            },
                                            {
                                                "id": 3052,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "P",
                                                "sitio": 3021
                                            },
                                            {
                                                "id": 3051,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "PR",
                                                "sitio": 3021
                                            },
                                            {
                                                "id": 3050,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "PR",
                                                "sitio": 3021
                                            },
                                            {
                                                "id": 3049,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "PR",
                                                "sitio": 3021
                                            },
                                            {
                                                "id": 3048,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "F",
                                                "sitio": 3021
                                            },
                                            {
                                                "id": 3047,
                                                "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                                                "tipo": "I",
                                                "sitio": 3021
                                            }
                                        ],
                                        "municipio": {
                                            "id": 23,
                                            "nombre": "Cota",
                                            "latitud": "4.809444444444440000",
                                            "longitud": "-74.098055555555600000"
                                        },
                                        "tags": [],
                                        "municipio_id": 23,
                                        "nombre": "423423",
                                        "telefono": "423423423",
                                        "whatsapp": "",
                                        "horariolocal": "",
                                        "web": "",
                                        "latitud": "4.808251686577228000",
                                        "longitud": "-74.094881415367130000",
                                        "descripcion": "423423432",
                                        "correolocal": "",
                                        "ubicacionlocal": "423423",
                                        "tipo_sitio": "S",
                                        "usuario": 3004
                                    },
                                    "sitio_id": 3021,
                                    "orden": 2,
                                    "ruta": 29
                                }
                            ],
                            "nombre": "2",
                            "descripcion": "423",
                            "tiempo": "6 min",
                            "distancia": "2,4 km",
                            "sitio": 3020
                        }
                    ],
                    "municipio": {
                        "id": 23,
                        "nombre": "Cota",
                        "latitud": "4.809444444444440000",
                        "longitud": "-74.098055555555600000"
                    },
                    "tags": [],
                    "municipio_id": 23,
                    "nombre": "Cota",
                    "telefono": "53534534",
                    "whatsapp": "",
                    "horariolocal": "",
                    "web": "",
                    "latitud": "4.810304370673903000",
                    "longitud": "-74.092134833335880000",
                    "descripcion": "rwrwrew",
                    "correolocal": "",
                    "ubicacionlocal": "534534",
                    "tipo_sitio": "M",
                    "usuario": 3004
                },
                {
                    "id": 3000,
                    "categorias": [],
                    "fotos": [
                        {
                            "id": 3002,
                            "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                            "tipo": "P",
                            "sitio": 3000
                        }
                    ],
                    "rutas": [],
                    "municipio": {
                        "id": 26,
                        "nombre": "Facatativá",
                        "latitud": "4.813611111111110000",
                        "longitud": "-74.354444444444400000"
                    },
                    "tags": [],
                    "municipio_id": 26,
                    "nombre": "Facatativá",
                    "telefono": "2708842",
                    "whatsapp": "",
                    "horariolocal": "",
                    "web": "",
                    "latitud": "4.802013413359239000",
                    "longitud": "-74.339445233345030000",
                    "descripcion": "Facatativá, tambiÃ©n conocido como Faca, es uno de los 116 municipios del departamento de Cundinamarca, centro de Colombia. Su nombre proviene del muisca, y tiene significados diferentes; sin embargo, Â«cercado fuerte al final de la llanuraÂ» es el más conocido y aceptado.",
                    "correolocal": "",
                    "ubicacionlocal": "Cra 24 # 15-16",
                    "tipo_sitio": "M",
                    "usuario": 3000
                },
                {
                    "id": 3003,
                    "categorias": [],
                    "fotos": [
                        {
                            "id": 3003,
                            "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                            "tipo": "P",
                            "sitio": 3003
                        }
                    ],
                    "rutas": [],
                    "municipio": {
                        "id": 60,
                        "nombre": "Nemocón",
                        "latitud": "5.050000000000000000",
                        "longitud": "-73.883333333333300000"
                    },
                    "tags": [],
                    "municipio_id": 60,
                    "nombre": "Nemocón",
                    "telefono": "2708842",
                    "whatsapp": "",
                    "horariolocal": "",
                    "web": "",
                    "latitud": "5.060604453534960000",
                    "longitud": "-73.878019452095030000",
                    "descripcion": "Nemocón es un municipio de Cundinamarca (Colombia), ubicado en la provincia de Sabana Centro, se encuentra a 45 km de Bogotá. Nemocón significa, en idioma muisca, \"Lamento o Rugido del Guerrero\". Los primitivos pobladores eran los nemzas, de la nación muisca. Desde tiempo inmemorial, los indÃ­genas explotaban las minas de sal. El 9 de julio de 1593 llegó de visita el oidor Miguel de Ibarra. El 11 de agosto, Francisco de Rivero hizo descripción de los indios, de la que resultaron 302. El 26 de julio de 1600 llegó de visita el Pedro Gonzales Rioja y profirió auto de esta fecha y junto con los indios de Tasgata fundó el pueblo. Más tarde, los de Tasgara fueron agregados a Tausa por JoaquÃ­n de Aróstequi.",
                    "correolocal": "",
                    "ubicacionlocal": "Cra 24 # 15-16",
                    "tipo_sitio": "M",
                    "usuario": 3000
                },
                {
                    "id": 3002,
                    "categorias": [],
                    "fotos": [
                        {
                            "id": 3001,
                            "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                            "tipo": "P",
                            "sitio": 3002
                        }
                    ],
                    "rutas": [],
                    "municipio": {
                        "id": 88,
                        "nombre": "Suesca",
                        "latitud": "5.103939700000000000",
                        "longitud": "-73.803009300000000000"
                    },
                    "tags": [],
                    "municipio_id": 88,
                    "nombre": "Suesca",
                    "telefono": "2708842",
                    "whatsapp": "",
                    "horariolocal": "",
                    "web": "",
                    "latitud": "4.802013413359239000",
                    "longitud": "-74.339445233345030000",
                    "descripcion": "Suesca es un municipio de Cundinamarca, en el centro de (Colombia), ubicado en la provincia de Almeidas. La palabra Suesca se deriva del vocablo muisca \"Suehica\", que significa \"Roca de las Aves\".",
                    "correolocal": "",
                    "ubicacionlocal": "Cra 24 # 15-16",
                    "tipo_sitio": "M",
                    "usuario": 3000
                },
                {
                    "id": 3001,
                    "categorias": [],
                    "fotos": [
                        {
                            "id": 3000,
                            "URLfoto": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paque_Nemoc%C3%B3n_Cundinamarca.JPG/1280px-Paque_Nemoc%C3%B3n_Cundinamarca.JPG",
                            "tipo": "P",
                            "sitio": 3001
                        }
                    ],
                    "rutas": [],
                    "municipio": {
                        "id": 116,
                        "nombre": "Zipaquirá",
                        "latitud": "5.021497200000000000",
                        "longitud": "-73.997903200000000000"
                    },
                    "tags": [],
                    "municipio_id": 116,
                    "nombre": "Zipaquirá",
                    "telefono": "2708842",
                    "whatsapp": "",
                    "horariolocal": "",
                    "web": "",
                    "latitud": "5.014092899650111000",
                    "longitud": "-73.990972638130190000",
                    "descripcion": "Zipaquirá es un municipio colombiano localizado en la provincia de Sabana Centro, de la que es su capital, sede de su diócesis y su ciudad más importante.ComÃºnmente llamado Zipa en referencia al Zipa; tÃ­tulo que ostentaba el cacique muisca del Cacicazgo de Bacatá. Es uno de los centros de explotación de sal más importantes en Colombia, razón por la cual se le llama la \"Ciudad de la Sal\" y \"el congelador de Cundinamarca\" debido a su clima frÃ­o con niebla en las maÃ±anas. ",
                    "correolocal": "",
                    "ubicacionlocal": "Cra 24 # 15-16",
                    "tipo_sitio": "M",
                    "usuario": 3000
                }];
            $scope.municipalitiesGroupedByLetter = groupMunicipalitiesByLetter(t);
        }

    });
