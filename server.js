'use strict'; 

const express = require('express');
const app = express();
const request = require('request'); 
const jsonParser = require('body-parser').json();

const client_id = 'f508191a9bf4407ca3d35a6c7f8eb795';
const client_secret = '44c1ba6d88714eeca37e42eddaf463b1';
//const cors = require('cors')
app.use(express.static('public'));
app.use(jsonParser);

//app.listen(process.env.PORT || 8080, () => console.log("listening"));
//const genreRouter = express.Router();
// app.use(cors({
//   origin: 'http://localhost:8080'
// }));
// your application requests authorization

app.get('/genresearch', (req, res) => {
  var html = "";
  const genre = Object.keys(req.query)[0].replace(/['"]+/g, '')
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    console.log("genre", genre)
    if (!error && response.statusCode === 200) {

      // use the access token to access the Spotify Web API
      var token = body.access_token;
      var options = {
        url: 'https://api.spotify.com/v1/search',
        qs: {
          q: "genre:" + '"' + genre + '"',
          type: "artist",
          limit: "20"
        },
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        // console.log("MADDEE IITTTTTT");
        // console.log("response", response)
        // console.log("body", body["artists"]["items"])
        if (body["artists"]["items"].length > 0) {
          var htmlTracker = 0
          var artist_lst = []
          html += '<p class="display-genre">Top tracks for: ' + genre + '</p>'  
          for (var i = 0; i < 5; i++) {
            while (true) {
              var artist_num = Math.floor(Math.random() * 20.0);
              if (!artist_lst.includes(artist_num)) {
                break
              };
            };
            artist_lst.push(artist_num);
            var trackOptions = {
              url: 'https://api.spotify.com/v1/search',
              qs: {
                q: "artist:" + body["artists"]["items"][artist_num]["name"],
                type: "track",
                limit: "5"
              },        
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + token
              },
              json: true
            };
            request.get(trackOptions, function(error, response, body) {
              var track_num = Math.floor(Math.random() * 5.0);
              console.log("body", body)
              var id = body["tracks"]["items"][track_num]["id"];
              html += '<iframe class="song" src="https://open.spotify.com/embed?uri=spotify:track:' + id + '" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>'             
              htmlTracker++
              if (htmlTracker === 5) {
                return res.status(200).json(html)
              };
            });
          }
        } else {
          html = "";
          html += '<p class="error">hmm...looks like the genre didnt return any results. Try searching for another genre, or disKover new music with our drop down list.</p>';
          return res.status(200).json(html)
        }
      });
    }
  });
});
// app.use('/search/', genreRouter);
app.listen(process.env.PORT || 8080, () => console.log("listening"));
module.exports = {app};