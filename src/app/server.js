var express = require('express');
var mysql=require('mysql');
var app=express();

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




})