var express	= require('express');
var mysql	= require('mysql');
var app		= express();
var path	= require('path');

var connection= mysql.createConnection({
	host 		: 'mydbinstance.cfhesrdyzslw.us-east-2.rds.amazonaws.com',
	port 		: '3306',
	user 		: 'db_admin',
	password 	: 'kavindesa1',
	database	: "movie_data"

});

connection.connect(function(err){

	if(!err) {
		console.log("Database is connected.");
	} else {
		console.log("Error connecting to database");
	}


app.get("/",function(req,res){

	
	res.sendFile(path.join(__dirname+'/home/home.component.html'));
});

app.get("/login",function(req,res){

	
	res.sendFile(path.join(__dirname+'/login/login.component.html'));
});


app.get("/sign-up",function(req,res){

	
	res.sendFile(path.join(__dirname+'/sign-up/sign-up.component.html'));
});




});

app.listen(8080);