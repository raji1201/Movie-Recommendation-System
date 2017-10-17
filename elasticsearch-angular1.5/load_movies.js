var fs = require('fs');
var es = require('elasticsearch');

var client = new es.Client({
  host : 'localhost:9200'
});

fs.readFile('movies.json', 'utf8', function(err, data){
  if(err) {
    throw err;
  }
  // console.log(typeof(data))
  data = JSON.parse(data)

  function create_bulk(bulk_request, obj){
    var movie; 

    bulk_request.push({index: {_index: 'testmovies', _type: 'movie', _id: Math.random(1, 10)}});
    
    movie = {
      name: obj.name,
      year: obj.year,
      posterurl: obj.posterurl,
      imdbRating: obj.imdbRating,
      releaseDate: obj.releaseDate,
      storyline: obj.storyline,
      duration: obj.duration
    }
    bulk_request.push(movie);

    return bulk_request;
  };

  for(var i = 0; i < data.length; i++){
    var br = [];
    var result = [];
    var result = create_bulk(br, data[i]);

    client.bulk(
    {
      body: result
    }, function(err, res) {
      console.log('ERROR: ' + err);
    });
  }

});