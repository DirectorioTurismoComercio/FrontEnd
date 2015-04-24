# API Rest de Anótame.la
anotame.la es una aplicacion que me permite crear notas de codigo para mis clases

## Metodos HTTP permitidos

|  Método  |              Descripción               |
| -------- | -------------------------------------- |
| `GET`    | Obtener un recurso o lista de recursos |
| `POST`   | Crear un recurso                       |
| `PUT`    | Actualizar un recurso                  |
| `DELETE` | Eliminar un recurso                    |

## Códigos de Respuesta

| Código |                         Descripción                          |
| ------ | ------------------------------------------------------------ |
| `200`  | Success                                                      |
| `201`  | Success - nuevo recurso creado.                              |
| `204`  | Success - no hay contenido para responder                    |
| `400`  | Bad Request - i.e. su solicitud no se pudo evaluar           |
| `401`  | Unauthorized - usuario no esta autenticado para este recurso |
| `404`  | Not Found - recurso no existe                                |
| `422`  | Unprocessable Entity - i.e. errores de validación            |
| `429`  | Limite de uso excedido, intente mas tarde                    |
| `500`  | Error de servidor                                            |
| `503`  | Servicio no disponible                                       |



## Recuperar todos los problemas_soluciones del usuario 1

Hacer get a /usuarios/1/problemas_soluciones
ejemplo de los objetos recuperados:
[
    {
        "id": 1, 
        "titulo": "Tengo un Problema", 
        "descripcion": "Es que...", 
        "fecha": "2015-04-24T03:02:11Z", 
        "tipo": "P", 
        "usuario": 1, 
        "categoria": []
    }
]


## Crear un Problema_solucion para un usuario cuyo id es 1. El campo F puede ser P o S para indicar que es Problema o Solución

Hacer POST a /usuarios/1/problemas_soluciones

    {
        "titulo": "Tengo un Problema", 
        "descripcion": "Es que...", 
        "tipo": "P",  
        "usuario": 1, 
        "categoria": []
    }
## Delete, Patch, Update

ruta: problemas_soluciones/1      donde 1 es el id del problema_solución (ojo, no el id del usuario).

## fin


## Crear una nota nueva

  Solicitud [POST] /productos
    {
      "producto":{
        "name": "Azurite",
        "description": "Some gems have hidden qualities beyond their luster, beyond their shine... Azurite is one of those gems.",
        "shine": 8,
        "price": 110.5,
        "rarity": 7,
        "color": "#CCC",
        "faces": 14,
        "images": [
            "images/gem-02.gif",
            "images/gem-05.gif",
            "images/gem-09.gif"
        ],
        "reviews": [
            {
                "stars": 5,
                "body": "I love this gem!",
                "author": "joe@example.org"
            },
            {
                "stars": 1,
                "body": "This gem sucks.",
                "author": "tim@example.org"
            }
        ]}
    }
  Respuesta

    {
      "nota":{
        "id": 125,
        "title": " #node-pro",
        "description": "Introduccion a clase",
        "type": "js",
        "body": "mira mama ya se JS"
      }
    }


## Obtener una nota
  Solicitud GET /notas/123

  Respuesta

    {
      "nota":{
        "id": 123,
        "title": " #node-pro",
        "description": "Introduccion a clase",
        "type": "js",
        "body": "mira mama ya se JS"
      }
    }

## Actualizar una nota
  Solicitud PUT /notas/123

    {
      nota:{
        "title": " #node-pro",
        "description": "Introduccion a clase",
        "type": "ruby",
        "body": "mira mama ya se ruby"
      }
    }

  Respuesta

    {
      nota:{
        "id": 123,
        "title": " #node-pro",
        "description": "Introduccion a clase",
        "type": "ruby",
        "body": "mira mama ya se ruby"
      }
    }

## Eliminar una nota

  Solicitud DELETE /notas/id (204)


## Obtener una lista de notas
  Solicitud GET /notas/

  Respuesta

    [{
      nota:{
        "id": 123,
        "title": " #node-pro",
        "description": "Introduccion a clase",
        "type": "js",
        "body": "mira mama ya se JS"
      }
    },
    {
      nota:{
        "id": 12345,
        "title": " #node-pro",
        "description": "Introduccion a clase",
        "type": "js",
        "body": "mira mama ya no se JS"
      }
    }]