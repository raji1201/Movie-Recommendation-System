

var express	= require('express');
var mysql	= require('mysql');
var bodyParser = require('body-parser');
var path	= require('path');
var app		= express();


const port	= process.env.PORT || 4200;

app.use(express.static(path.join(__dirname, 'dist')));


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

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


// app.get("/",function(req,res){

// 	console.log("root");
// 	res.sendFile(path.join(__dirname+'/src/app/home/home.component.html'));
// });

app.post("/loginuser",function(req,res){
	console.log("came into login");
	var body= req.body;
	console.log(body);
	
	ip_name="'Kavin'";
	ip_password="'password'";
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
	res.json({name:ip_name});
});


app.get("/sign-up",function(req,res){

	
	res.sendFile(path.join(__dirname+'/src/app/sign-up/sign-up.component.html'));
});




});

app.listen(port,function(){

	console.log("Listening on port "+port);

});