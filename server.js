'use strict'; 

const express = require('express');
const app = express();
const request = require('request'); 

const client_id = 'f508191a9bf4407ca3d35a6c7f8eb795';
const client_secret = '44c1ba6d88714eeca37e42eddaf463b';

app.use(express.static('public'));

app.listen(process.env.PORT || 8080, () => console.log("listening"));
const genreRouter = express.Router();

// your application requests authorization


genreRouter.get('/genresearch', (req, res) => {
  console.log('inside genreRouter')
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  request.post(authOptions, function(error, response, body, genre) {
    console.log("response", response)
    console.log("body", body)
    if (!error && response.statusCode === 200) {

      // use the access token to access the Spotify Web API
      var token = body.access_token;
      var options = {
        url: 'https://api.spotify.com/v1/',
        data: "genre:" + '"' + query + '"',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, function(error, response, body) {
        console.log(body);
      });
    }
  });
});
app.use('/search/', genreRouter);

module.exports = {app, genreRouter};