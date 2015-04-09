//---------------------------
//Supertest
//para hacer solicitud al
//hace lo mismo que postman
var request  = require('supertest-as-promised');
var api      = require('../server.js');
var logger   = require('../lib/logger/logger.js');
// var async = require('async');
//correr pruebas con diferentes host
var host     = process.env.API_TEST_HOST || api;
request      = request(host);

function createProduct(){
	// logger.info("TEST - BeforeEach");
	var id;
	var data = {
		producto:{
				name       : 'Azurite',
				description: "Some gems have hidden qualities beyond their luster, beyond their shine... Azurite is one of those gems.",
				shine      : '8',
				price      : '110.50',
				rarity     : '7',
				color      : '#CCC',
				faces      : '14',
				images     : [
		    	"images/gem-02.gif",
		    	"images/gem-05.gif",
		    	"images/gem-09.gif"
		  	],
		    reviews: [{
					stars : '5',
					body  : "I love this gem!",
					author: "joe@example.org"
			    },
			    {
					stars : '1',
					body  : "This gem sucks.",
					author: "tim@example.org"
		  	}]
		  }
		 };
	return request.post('/productos')
		.set('Accept', 'application/json')
		.send(data)
		.expect(201)
		.then(function getproducto (res){
			this.id = res.body.producto._id;
			// logger.info("TEST - createProduct() - res.body",res.body);
		}.bind(this));
}

function createProducts(){
	var id;
	var data1 = {
					"producto":{
						name: '111111',
						description: "Some gems have hidden qualities beyond their luster, beyond their shine... Azurite is one of those gems.",
						shine: '8',
						price: '110.50',
						rarity: '7',
					  	color: '#CCC',
					  	faces: '14',
					  	images: [
					    	"images/gem-02.gif",
					    	"images/gem-05.gif",
					    	"images/gem-09.gif"
					  	],
					    reviews: [{
						    stars: '5',
						    body: "I love this gem!",
						    author: "joe@example.org"
					    }, {
					    	stars: '1',
					    	body: "This gem sucks.",
					    	author: "tim@example.org"
					  	}]}
			};
	var data2 = {
					"producto":{
						name: '222222',
						description: "Some gems have hidden qualities beyond their luster, beyond their shine... Azurite is one of those gems.",
						shine: '8',
						price: '110.50',
						rarity: '7',
					  	color: '#CCC',
					  	faces: '14',
					  	images: [
					    	"images/gem-02.gif",
					    	"images/gem-05.gif",
					    	"images/gem-09.gif"
					  	],
					    reviews: [{
						    stars: '5',
						    body: "I love this gem!",
						    author: "joe@example.org"
					    }, {
					    	stars: '1',
					    	body: "This gem sucks.",
					    	author: "tim@example.org"
					  	}]}
			};
	request.post('/productos')
		.set('Accept', 'application/json')
		.send(data1)
		.expect(201)
		.end();
	request.post('/productos')
		.set('Accept', 'application/json')
		.send(data2)
		.expect(201)
		.end();
}
//hacer una prueba del resource productos.js
//esta funcion describe el contexto de la prueba inicial
describe('resource /productos', function (){
	//La primera prueba sera POST
	describe('POST', function () {
		it('should return/create a new Object', function (done){
			// throw new Error('tengo hambre');
			// return true;
			//crear producto nueva
			var data = {
					"producto":{
							name       : 'Azurite',
							description: "Some gems have hidden qualities beyond their luster, beyond their shine... Azurite is one of those gems.",
							shine      : '8',
							price      : '110.50',
							rarity     : '7',
							color      : '#CCC',
							faces      : '14',
							images     : [
					    	"images/gem-02.gif",
					    	"images/gem-05.gif",
					    	"images/gem-09.gif"
					  	],
					    reviews: [{
						    stars: '5',
						    body: "I love this gem!",
						    author: "joe@example.org"
					    }, {
					    	stars: '1',
					    	body: "This gem sucks.",
					    	author: "tim@example.org"
					  	}]
					  }
			};
			request.post('/productos')
				.set('Accept', 'application/json')
				.send(data)
				.expect(201)
				.expect('Content-Type', /application\/json/)
				.end(function (err, res){
					var body = res.body;
					expect(body).to.have.property('producto');
					var producto = body.producto;
					var _id = body.producto._id;
					// logger.info("TEST - POST - _id:",_id);
					// logger.info("TEST - POST - res.body:",res.body);
					//does the Object exist?
					expect(producto).to.have.property('name', 'Azurite');
					expect(producto).to.have.property('description', 'Some gems have hidden qualities beyond their luster, beyond their shine... Azurite is one of those gems.');
					expect(producto).to.have.property('shine', '8');
					expect(producto).to.have.property('price', '110.50');
					expect(producto).to.have.property('_id');
					done();
				});
		});
	});
	describe('GET', function() {
		beforeEach(createProduct);
		it('deberia obtener un producto existente', function (done) {
			var id = this.id;
			// logger.info("TEST - GET - this.id: ",id);
			return request.get('/productos/'+id)
				.set('Accept', 'application/json')
				.send()
				.expect(200)
				.expect('Content-type', /application\/json/)
			.then(function assertions (res){
				var productos = res.body.productos;
				// logger.info("TEST - GET - res.body.productos['0']",productos['0']);
				var producto  = productos[0];
				expect(res.body).to.have.property('productos');
				expect(producto).to.have.property('_id', id);
				expect(producto).to.have.property('name', 'Azurite');
				expect(producto).to.have.property('description', 'Some gems have hidden qualities beyond their luster, beyond their shine... Azurite is one of those gems.');
				expect(producto).to.have.property('shine', '8');
				expect(producto).to.have.property('price', '110.50');
				done();
			}, done);
		});
		it('deberia obtener una lista de todas las productos', function (done){
			// createProducts();
			return request.get('/productos/')
				.send()
				.expect(200)
				.expect('Content-type', /application\/json/)
			.then(function assertions (res){
				var producto = res.body;
				// logger.info("TEST - GET-ALL - res.body",res.body);
				// logger.info("TEST - GET-ALL - producto['productos'][0]",producto['productos'][0]);
				expect(res.body).to.have.property('productos')
					.and.to.be.an('array')
					.and.to.have.length.above(0);
					var producto1 = producto[0];
					// logger.info("TEST - GET-ALL - producto1",producto[0]);
				done();
			}, done);
		});
	});
	describe('PUT', function() {
		beforeEach(createProduct);
		it('deberia actualizar un producto existente', function (done) {
			var _id = this.id;
			return request.get('/productos/'+_id)
				.set('Accept', 'application/json')
				.send()
				.expect(200)
				.expect('Content-type', /application\/json/)
			.then(function putproducto (res){
				var productos   = res.body.productos;
				var productoActualizado = productos['0'];
				productoActualizado.title = "producto actualizada Kwan";
				return request.put('/productos/'+_id)
					.send({producto:productoActualizado})
					.expect(200)
					.expect('Content-type', /application\/json/);
			}, done)
			//eveluar que la producto se haya actualizado correctamente
			.then(function assertions (res){
				// logger.info("in assertions");

				var productoValidar = res.body.producto;
				// logger.info('res.body:',res.body);
				// logger.info('productoValidar',productoValidar);
				expect(res.body).to.have.property('producto');
				expect(productoValidar).to.have.property('_id', _id);
				expect(productoValidar).to.have.property('name', 'Azurite');
				expect(productoValidar).to.have.property('description', 'Some gems have hidden qualities beyond their luster, beyond their shine... Azurite is one of those gems.');
				expect(productoValidar).to.have.property('shine', '8');
				expect(productoValidar).to.have.property('price', '110.50');
				done();
			}, done);
		});
	});
	describe('DELETE', function() {
		beforeEach(createProduct);
		it('deberia borrar un producto existente', function (done){
			var id = this.id;
			return request.delete('/productos/'+id)
			.expect(204)
			// .then(function assertObjectDestroyed(res){
			// 	return request.get('/productos/'+id)
			// 	.expect(400);
			// }, done)
			.then( function (){
				done();
			});
		});
	});
});