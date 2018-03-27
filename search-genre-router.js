const express = require('express');

//const genreRouter = express.Router();
const client_id = require('./config.js');
const client_secret = require('./config.js');

var genres = ["Rap", "House", "Rock", "Pop", "Country", "Classical", "Latin", "R&B"]; 


exports.searchGenre = function (query) {
  console.log("query", query)
  var html = "";
    $.ajax({
      url: 'https://accounts.spotify.com/api/token',
      type: 'POST',
      // contentType: 'application/x-www-form-urlencoded',
      json: true,
      form: {
        grant_type: 'client_credentials'
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Basic ' + client_id + ':' + client_secret
      },
      success: function(error, response, body) {
        var token = body.access_token;
        $.ajax({
            url: 'https://api.spotify.com/v1/search',
            type: 'GET',
            data: {
                q: "genre:" + '"' + query + '"', 
                type: "artist",
                limit: "20" 
            },
            json: true,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Authorization': 'Bearer ' + token
            },
            success: function(error, response, body) {
              console.log("error", error)
              console.log("response", response)
              console.log("body", body)
              if (response["artists"]["items"].length > 0) {
                var htmlTracker = 0
                artist_lst = []
                html += '<p class="display-genre">Top tracks for: ' + query + '</p>'  
                for (i = 0; i < 5; i++) {
                  while (true) {
                    var artist_num = Math.floor(Math.random() * 20.0);
                    if (!artist_lst.includes(artist_num)) {
                      break
                    };
                  };
                  artist_lst.push(artist_num);
                  $.ajax({
                    url: 'https://api.spotify.com/v1/search',
                    data: {
                      q: "artist:" + response["artists"]["items"][artist_num]["name"],
                      type: "track",
                      limit: "5"
                    },
                    type: 'GET',
                    json: true,
                    success: function(track) {
                      var track_num = Math.floor(Math.random() * 5.0);
                      var id = track["tracks"]["items"][track_num]["id"];
                      html += '<iframe class="song" src="https://embed.spotify.com/?uri=spotify:track:' + id + '" frameborder="0" allowtransparency="true"></iframe>'             
                      htmlTracker++
                      if (htmlTracker === 5) {
                        $(".container").html(html);
                      };
                    }
                  })
                }
              } else {
                html = "";
                html += '<p class="error">hmm...looks like the genre didnt return any results. Try searching for another genre, or disKover new music with our drop down list.</p>';
                $(".container").html(html);
              }
            $(".container").html(html); 
            }, 
        });
      }
  });
};