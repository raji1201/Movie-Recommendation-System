var assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const request = require('supertest');
const app = require('../server');
var should = chai.should();
var server = request.agent("http://localhost:3000");


chai.use(chaiHttp);



describe('Testing login user',function() {
	it('should return error',(done) => {
		let user = {
			email:'not existing',
			password:'wrong'
		}
		server
			.post('/loginuser')
			.send(user)
			.end((err,res) => {

				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('name').eql('ERROR');
		done();
			});
	});
	it('it should return kavin',(done) => {
		let user ={
			email:'kavin@gmail.com',
			password:'password'
		}
		server
			.post('/loginuser')
			.send(user)
			.end((err,res) => {

				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('name').eql('Kavin');
		done();
	});
});
});

describe('Testing sign up user', function() {
	it('should return NOTEQUAL as passwords are not same',(done) => {
		let user = {
			name:'Knope',
			email:'knope@par.com',
			password:'password',
			verifyPassword:'notpassword'
		}
		server
			.post('/signupuser')
			.send(user)
			.end((err,res) => {

				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('name').eql('NOTEQUAL');
		done();
			});
	});
	it('should return DUPLICATE as duplicate entry exists',(done) => {
		let user = {
			name:'Kavin',
			email:'kavin@gmail.com',
			password:'password',
			verifyPassword:'password'
		}
		server
			.post('/signupuser')
			.send(user)
			.end((err,res) => {

				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('name').eql('DUPLICATE');
		done();
			});
	});
	it('should return Knope as it is a new user', (done) => {
		let user = {
			name:'Knope',
			email:'knope@par.com',
			password:'password',
			verifyPassword:'password'
		}
		server
			.post('/signupuser')
			.send(user)
			.end((err,res) => {

				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('name').eql('Knope');
		done();
		});
	});
});

describe('Testing top rated movies', function() {
	it('should return 3 movies', (done) => {
		server
			.get('/home')
			.end((err,res) => {

				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('m1');
				res.body.should.have.property('m2');
				res.body.should.have.property('m3');
		done();
			});
	});
	it('should return 5 movies', (done) => {
		server
			.get('/seemore')
			.end((err,res) => {

				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('m1');
				res.body.should.have.property('m2');
				res.body.should.have.property('m3');
				res.body.should.have.property('m4');
				res.body.should.have.property('m5');
		done();
			});
	});
});

describe('Testing to get movie details', function() {
	it('should return details about Avengers', (done) => {
		let movie ={
			movie:'The Avengers'
		}
		server
			.post('/moviereview')
			.send(movie)
			.end((err,res) => {

				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('name').eql('The Avengers');
				res.body.should.have.property('rating');
				res.body.should.have.property('users');
				res.body.should.have.property('length').eql(143);
				res.body.should.have.property('rel').eql(2012);
				res.body.should.have.property('des');
		done();
			});
	});
});

describe('Testing checkWatched' , function() {
	it('should return true',(done) => {
		let data = {
			username:'Kavin',
			movie:'Jurassic World'
		}
		server
			.post('/checkWatched')
			.send(data)
			.end((err,res) => {

				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('watch').eql(true);
		done();

			});
	});
	it('should return false', (done) => {
		let data = {
			username:'Kavin',
			movie:'The Avengers'
		}
		server
			.post('/checkWatched')
			.send(data)
			.end((err,res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('watch').eql(false);
		done();
			});
	});
});

describe('Testing watched',function() {
	it('should return dummy',(done) => {
		let watch = {
			username:'Kavin',
			movie:'Jurassic World'
		}
		server
			.post('/watched')
			.send(watch)
			.end((err,res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('dummy');
		done();

			});
	});
});

describe('Testing updateRating', function() {
	it('should return rating and user', (done) => {
		let data = {
			movie:'Avatar',
			rating:4
		}
		server
			.post('/updateRating')
			.send(data)
			.end((err,res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('rating');
				res.body.should.have.property('users');
		done();
		});
	});
});

