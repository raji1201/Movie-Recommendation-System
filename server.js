/*
File name : server.js
Written by : Kavin Desai
Written for : As part of project for CEN 5035 Software Engineering

This file is server code for Movie recommendation system
*/

/*
Here we call the packages which will be needed for the server code.
express:     This is the server on which the backend runs
mysql: 	     The database used is mySQL, to communicate with mySQL engine, this package is needed
body-parser: The frontend sends data in the body part of the request packet, to access the body and extract needed information, we need to use the body-parser package.
path: 		 The path package is used so that no mattter where the folder is located, the needed files can be accessed easily	
*/

var express	= require('express');
var mysql	= require('mysql');
var bodyParser = require('body-parser');
var path	= require('path');
var app		= express();

//The port on which node has to run is 3000.
const port	= process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'dist')));

// This is to inform backend that incoming request packet has data in terms of JSON object.
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//connection variable has all the needed credentials to connect with the database and perform authentication
var connection= mysql.createConnection({
	host 		: 'mydbinstance.cfhesrdyzslw.us-east-2.rds.amazonaws.com',
	port 		: '3306',
	user 		: 'db_admin',
	password 	: 'kavindesa1',
	database	: "movie_data"

});


//Connecting with the database which is being hosted on AWS.
connection.connect(function(err){

	if(!err) {
		console.log("Database is connected.");
	} else {
		console.log("Error connecting to database");
	}
});

/*
Now with the basics done.
From now the routing is performed.
For each a POST or GET request is performed and accordingly a database query is created and fired.
The results of the query are then stored in a JSON format and sent back to the frontend to be displayed.
*/
/*
The route performs loginuser.
The email address and password is extracted from the request packet and checked in database.
One of the outputs are sent back.
	1. The user's name is sent to displayed as "Welcome xyz". This signfies it was a correct login
	2. The word ERROR is sent back signifying that there was some mistake in either email or password and should be rechecked.
*/

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

/*
In this route a new user is added to our database.
The name,email address, password and verifyPassword are extracted from database.
If the two passwords do not match a output of NOTEQUAL is sent back to show that the passwords do not match.
If the user already exists in the database, then mySQL gives an error. That error is caught and corresponindgly a DUPLICATE output is sent back.
If everything goes well, then the name of the user is sent back so "Welcome xyz" can be displayed.
*/

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

/*
This is to get the top rated movies which can be seen in the homepage.
The top 3 rated movies have to be shown.
Since no data from user is needed,this is a get request.
One criteria while giving top rated movies is that atleast 20 users should have rated it.
The top 3 movies are sent back in the following JSON format
{
	m1: --
	m2: --
	m3: -- 
}
*/

app.get('/home', function(req,res){

	var sql="select title from movie where users >= 20 order by rating desc,users desc limit 3;";
	
	connection.query(sql,function(err,result,fields){

		if(err) throw err;

		var obj={m1:result[0].title, m2:result[1].title,m3:result[2].title};
		res.json(obj);

	})
});

/*
Similar to home page, if user wants to see more top rated movies,top 5 movies are sent back with the same criteria.
The JSON object sent back is in the following format.
{
	m1: --
	m2: --
	m3: --
	m4: --
	m5: --
}
*/

app.get('/seemore',function(req,res){

	var sql="select title from movie where users >= 20 order by rating desc,users desc limit 5;";

	connection.query(sql,function(err,result,fields){

		if(err) throw err;

		var obj={m1:result[0].title, m2:result[1].title, m3:result[2].title, m4:result[3].title, m5:result[4].title};
		res.json(obj);

	});

});

/*
The user selects a movie and wishes to see it's details.
The selected movie is sent to backend.
Here the database is queried and several details are extrated and sent back to the user in a JSON object.
The format of the object is

{
	budget:		--
	site: 		--
	des: 		--
	rel: 		--
	run: 		--
	tag: 		--
	production: --
	title: 		--
	rating: 	--
	user: 		--
}

*/
app.post('/moviereview',function(req,res){
	var movie_name=req.body.movie;

	var sql="select budget,homepage,genres,overview,production_companies,release_date,revenue,runtime,tagline,title,rating,users from movie where title='"+movie_name+"'";
	
	connection.query(sql,function(err,result,fields){

		if(err) throw err;
		
		var prod=result[0].production_companies;
		var gen=result[0].genres;
		prod=JSON.parse(prod);
		gen=JSON.parse(gen);
		var prod_c=[];
		var genre=[];

		for(var i=0;i<prod.length;i++) {
			prod_c.push(prod[i].name);

		}
		for(var i=0;i<gen.length;i++) {
			genre.push(gen[i].name);
		}
		console.log(prod_c);
		var obj={budget:result[0].budget,site:result[0].homepage,genres:genre,des:result[0].overview,rel:result[0].release_date,run:result[0].runtime,tag:result[0].tagline,production:prod_c,title:result[0].title,rating:result[0].rating,user:result[0].users};
		console.log(obj);

		res.json(obj);

	});
	
});

/*
While displaying a movie for a user, the website shows whether that user has watched that particular movie or not.
The request packet gives username and moviename and we check if the user has already watched that movie or not.
True is sent back if the user has watched that particular movie.
False is sent back if the user has not watched that movie.
*/

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

/*
When the user clicks on the Watched button a post request is made with the username and movie name.
The database is updated with the username and moviename.
A check is in place in case the user clicks the on the button again.
This is to prevent from entering the same values multiple times.
A dummy data is sent back to frontend to signify end of function.
*/

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

/*
The user can add their own rating.
For that the movie name and rating is taken.
The rating is recalculated with the new rating in place.
The updated rating and users who have rated it is updated in database and sent to frontend to be displayed.
*/

app.post('/updateRating',function(req,res){

	var mname=req.body.movie;
	var rating=req.body.rating;

	rating=rating*2;
	

	var sql="select rating,users from movie where title='"+mname+"';";

	connection.query(sql,function(err,result,fields){

		if(err) throw err;

		
		var old_u=result[0].users;
		var old_r=result[0].rating;
		var old_sum=old_u * old_r;
		
		var new_sum=old_sum + rating;
		var new_a=new_sum/(old_u+1);
		
		new_a=Math.round(new_a*10)/10;
		old_u=old_u+1;
		

		var sql2="update movie set users="+old_u+", rating="+new_a+" where title='"+mname+"';"
		
		connection.query(sql2,function(err,result,fields){

			if(err) throw err;

			res.json({rating:new_a,users:old_u});

		});
	});
});

/*
If the user wants to see all the movies the user has watched.
This post request is called, the request packet has the username.
The JSON object sent back is an array which has all the movies that the user has watched.
*/

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

app.post('/testing', function(req,res){
	console.log("I came here!");
	var sql='select * from test;';
	connection.query(sql,function(err,result,fields){
		if(err) throw err;

		console.log(result);
		var data=(result[0].data);
		console.log(data);
		console.log(Object.prototype.toString.call(data));
		var jdat=JSON.parse(data);
		console.log(jdat);
		console.log(jdat[0].name);

		console.log(jdat[1].name);

		console.log(jdat[2].name);

	})
	res.json({name:'Kavin'});


	/*
		I get a user's name.
		I extract user's top 3 choices and store in an array ( gotta see how to extract top 3 from rows)


		Start for loop to go for 100/150 movies
		{
			Take a movie
			Extract it's genres
			Store them in an array.
			Perform intersection of two arrays to get common genres.
			if(common.length == 3)
				reco.3same.push(moviename)
			else if(common.length == 2)
				reco.2same.push(moviename)
			else if(common.length ==2)
				reco.1same.push(moviename)

			if(reco.3same. length = * number of movies I want *)
				send json(movies: reco.3same)
			else if ( reco3.same.length + reco2same.length == * number of movies I want + 4*)
				concat both of them
				slice to amount I want
				send it
			else if(3same + 2same + 1same  == * movies I want + 10 * )
				concat 3 of them
				slice it
				send it 
		}
	*/
});




app.listen(port,function(){

	console.log("Listening on port "+port);

});

module.exports=app;