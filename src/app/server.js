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
	
	var sql="SELECT * from user where name="+ip_name+" and password="+ip_password;

	console.log(sql);
	connection.query(sql,function(err,result,fields){
		if(err) throw err;
		console.log(result);
		var name=result[0].name;
		var email=result[0].email;
		var password=result[0].password;
		console.log(name);
		console.log(email);
		console.log(password);

	});
	res.sendFile(path.join(__dirname+'/login/login.component.html'));
});


app.get("/sign-up",function(req,res){

	
	res.sendFile(path.join(__dirname+'/sign-up/sign-up.component.html'));
});


app.post()


});

app.listen(8080);