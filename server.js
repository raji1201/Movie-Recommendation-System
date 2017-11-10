

var express	= require('express');
var mysql	= require('mysql');
var bodyParser = require('body-parser');
var path	= require('path');
var app		= express();


const port	= process.env.PORT || 3000;

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
});



app.post('/loginuser',function(req,res){
	
	ip_email=req.body.email;
	ip_password=req.body.password;
	var op_name="ERROR";
	var sql="SELECT * from user where email='"+ip_email+"' and password='"+ip_password+"'";


	connection.query(sql,function(err,result,fields){
		if(err) {
			throw err;
		}		
		
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


app.post('/signupuser',function(req,res){

	var name=req.body.name;
	var email=req.body.email;
	var password=req.body.password;
	var re_pass=req.body.verifyPassword;
	if(password != re_pass) {
		res.json({name:"NOTEQUAL"});
	}
	else {
		var sql="INSERT INTO user VALUES('"+name+"','"+email+"','"+password+"');";
		
		connection.query(sql,function(err,result,fields){

			if(err){
				if(err.code == 'ER_DUP_ENTRY') {
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

app.get('/home', function(req,res){

	var sql="select name from movie where users >= 5 order by rating desc,users desc limit 3;";
	
	connection.query(sql,function(err,result,fields){

		if(err) throw err;

		var obj={m1:result[0].name, m2:result[1].name, m3:result[2].name};
		res.json(obj);

	})
});

app.get('/seemore',function(req,res){

	var sql="select name from movie where users >= 5 order by rating desc,users desc limit 5;";

	connection.query(sql,function(err,result,fields){

		if(err) throw err;

		var obj={m1:result[0].name, m2:result[1].name, m3:result[2].name, m4:result[3].name, m5:result[4].name};
		res.json(obj);

	})

});

app.post('/moviereview',function(req,res){
	var movie_name=req.body.movie;

	var sql="select * from movie where name='"+movie_name+"'";
	
	connection.query(sql,function(err,result,fields){

		if(err) throw err;
	
		var obj={name:result[0].name,rating:result[0].rating,users:result[0].users,length:result[0].length,rel:result[0].rel,des:result[0].des};
		
		res.json(obj);

	});
	
});

app.post('/checkWatched',function(req,res){

	var uname=req.body.username;
	var mname=req.body.movie;

	var sql="select * from watched where user='"+uname+"' and mname='"+mname+"';";
	
	connection.query(sql,function(err,result,fields){

		if(err) throw err;

		
		if(result.length>0)
			res.json({watch:true});
		else
			res.json({watch:false});


	});
});

app.post('/watched',function(req,res){
	
	var uname=req.body.username;
	var mname=req.body.movie;

	var sql_pre="select * from watched where user='"+uname+"' and mname='"+mname+"';";

	connection.query(sql_pre,function(err,result,fields){

		
		if(result.length>0)
			res.json({dummy:"dummy"});
		else {

			var sql="insert into watched values('"+uname+"','"+mname+"');";

			connection.query(sql,function(err,result,fields){

				if(err) throw err;	

				res.json({dummy:"dummy"});
			});

			}

	});

	
});

app.post('/updateRating',function(req,res){

	var mname=req.body.movie;
	var rating=req.body.rating;

	rating=rating*2;
	

	var sql="select rating,users from movie where name='"+mname+"';";

	connection.query(sql,function(err,result,fields){

		if(err) throw err;

		
		var old_u=result[0].users;
		var old_r=result[0].rating;
		var old_sum=old_u * old_r;
		
		var new_sum=old_sum + rating;
		var new_a=new_sum/(old_u+1);
		
		new_a=Math.round(new_a*10)/10;
		old_u=old_u+1;
		

		var sql2="update movie set users="+old_u+", rating="+new_a+" where name='"+mname+"';"
		
		connection.query(sql2,function(err,result,fields){

			if(err) throw err;

			res.json({rating:new_a,users:old_u});

		});
	});
});

app.post('/watchedmovies',function(req,res){

	var username=req.body.username;
	var sql="select mname from watched where user='"+username+"';";
	var movies=[];
	

	connection.query(sql,function(err,result,fields){

		if(err) throw err;

		
		for(var i=0;i<result.length;i++) {
			var temp=result[i].mname;
			movies.push(temp);

		}
		var obj={movies:movies};
		res.json(obj);
	});
});





app.listen(port,function(){

	console.log("Listening on port "+port);

});

module.exports=app;