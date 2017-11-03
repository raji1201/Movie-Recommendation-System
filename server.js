

var express	= require('express');
var mysql	= require('mysql');
var bodyParser = require('body-parser');
var path	= require('path');
var app		= express();


const port	= process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'dist')));


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
//app.use(bodyParser.json());

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
});



app.post("/loginuser",function(req,res){
	console.log("came into login");
	
	
	ip_email=req.body.email;
	ip_password=req.body.password;
	var op_name="ERROR";
	var sql="SELECT * from user where email='"+ip_email+"' and password='"+ip_password+"'";


	connection.query(sql,function(err,result,fields){
		if(err) {
			throw err;
		}		
		console.log(result);

		if(result.length>0)
		{
			op_name=result[0].name;
			res.json({name:op_name});
		}
		else {
			res.json({name:op_name});
		}
	});

	
});


app.post("/signupuser",function(req,res){

	console.log("Entered sign up");
	var name=req.body.name;
	var email=req.body.email;
	var password=req.body.password;
	var re_pass=req.body.verifyPassword;
	if(password != re_pass) {
		console.log("Not equal");
		res.json({name:"NOTEQUAL"});
	}
	else {
		var sql="INSERT INTO user VALUES('"+name+"','"+email+"','"+password+"');";
		
		connection.query(sql,function(err,result,fields){

			if(err){
				console.log(err.code);
				if(err.code == 'ER_DUP_ENTRY') {
					console.log("Duplicate entry!");
					res.json({name:"DUPLICATE"});
				}

			}
			else 
			{
			
			res.json({name:name});
		}
		})

	}
	
});








app.listen(port,function(){

	console.log("Listening on port "+port);

});