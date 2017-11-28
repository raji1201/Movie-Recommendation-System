/*
This the test file for performing tests on each route and whether they perform as expected.
For each possible outcome a test is created.
The tests are divided into groups of each route which are further divided into each possible outcome for each route
*/

/*
The required packages are stored in variables
*/

var assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const request = require('supertest');
const app = require('../server');
var should = chai.should();
var server = request.agent("http://localhost:3000");


chai.use(chaiHttp);

/*
This test checks the login feature.
The two tests check for a user which does not exist and one checks for a user which does exist.
The test sends a post request with a given a data and checks what the output should have
*/

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

/*
This test checks the sign up route.
The four tests in here check for
	-a correct sign up
	-incorrect sign up when passwords do not match
	-the user already exists
The data is sent in post request and response is checked
*/

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

/*
Testing the top rated movies feature.
The top 3 movies should be in single key value pair.
The top 10 movies should be an array
*/

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
	it('should return 10 movies', (done) => {
		server
			.get('/seemore')
			.end((err,res) => {

				res.should.have.status(200);
				res.body.should.be.a('object');
		done();
			});
	});
});

/*
This feature tests the movie details route.
*/

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
				res.body.should.have.property('run').eql(143);
				res.body.should.have.property('des');
				res.body.should.have.property('budget');
				res.body.should.have.property('site');
				res.body.should.have.property('genres');
				res.body.should.have.property('rel');
				res.body.should.have.property('tag')
		done();
			});
	});
});

/*
This test checks the watched route.
It tests for two movies, one which the use has watched and one which it hasn't watched
*/

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

/*
This route enables the user to watch a movie and insert it into the database.
*/

describe('Testing watched',function() {
	it('should return dummy',(done) => {
		let watch = {
			username:'Kavin',
			movie:'Fight Club'
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
/*
This test is for checking whether the route for updating a rating is working or not.
The new rating and user number should return.
*/
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

/*
This test checks if all watched movies route is working or not.
A username is given and the expected output is an array
*/
describe('Testing watched movies list',function() {
	it('should return a movie array',(done) => {
		let data = {
			username:'Kavin'
		}
		server
			.post('/watchedmovies')
			.send(data)
			.end((err,res) => {
				res.shoud.have.status(200);
				res.should.be.a.('object');
				res.should.have.property('movies');
		done();
		});
	});
});

/*
This test checks for 3 recommended movies.
This has two tests, in one case the user has not watched any movies, so it should return top rated movies.
In second test, user has some preference so the movies should be different
*/
describe('Testing top 3 recommended movies',function() {
	it('should return top rated movies',(done) => {
		
	})
})
