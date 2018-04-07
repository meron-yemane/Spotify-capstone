
//"use strict";
//const {searchGenre} = require('./search-genre-router.js');
//var request = require('request');
//var {client_id, client_secret} = require('../config');


// var client_id = 'f508191a9bf4407ca3d35a6c7f8eb795';
// var client_secret = '44c1ba6d88714eeca37e42eddaf463b';
const genres = ["Rap", "House", "Rock", "Pop", "Country", "Classical", "Latin", "R&B"]; 

// var authOptions = {
//   url: 'https://accounts.spotify.com/api/token',
//   headers: {
//     'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//   },
//   form: {
//     grant_type: 'client_credentials'
//   },
//   json: true
// };

// var searchGenre = request.get(authOptions, function(error, response, body) {
//   if (!error && response.statusCode === 200) {
//     var token = body.access_token;
//     var options = {
//       url: 'https://api.spotify.com/v1/search',
//       data: {
//         q: "genre:" + '"' + query + '"', 
//         type: "artist",
//       },
//       headers: {
//         'Authorization': 'Bearer ' + token
//       },
//       json: true
//     };
//   }
//   request.get(options, function(error, response, body) {
//       if (!error && response.statusCode === 200) {
//         if (response["artists"]["items"].length > 0) {
//           var htmlTracker = 0
//           artist_lst = []
//           html += '<p class="display-genre">Top tracks for: ' + query + '</p>'
//           for (i = 0; i < 5; i++) {
//             while (true) {
//               var artist_num = Math.floor(Math.random() * 20.0);
//               if (!artist_lst.includes(artist_num)) {
//                 break
//               };
//             };
//             artist_lst.push(artist_num);
//             var options = {
//               url: 'https://api.spotify.com/v1/search',
//               data: {
//                 q: "artist:" + response["artists"]["items"][artist_num]["name"],
//                 type: "track",
//                 limit: "5"
//               }
//             }
//             request.get(options, function(error, response, body) {
//               var track_num = Math.floor(Math.random() * 5.0);
//               var id = track["tracks"]["items"][track_num]["id"];
//               html += '<iframe class="song" src="https://embed.spotify.com/?uri=spotify:track:' + id + '" frameborder="0" allowtransparency="true"></iframe>'
//               htmlTracker++
//               if (htmlTracker === 5) {
//                 $(".container").html(html);
//               }
//             });
//           }
//         } else {
//           html = "";
//           html += '<p class="error">hmm...looks like the genre didnt return any results. Try searching for another genre, or disKover new music with our drop down list.</p>';
//           $(".container").html(html);
//         }
//         $(".container").html(html);
//       }
//   });
// });


// var searchGenre = function (query) {
//   console.log("query", query)
//   var html = "";
//     $.ajax({
//       url: 'https://accounts.spotify.com/api/token',
//       type: 'POST',
//       // contentType: 'application/x-www-form-urlencoded',
//       json: true,
//       form: {
//         grant_type: 'client_credentials'
//       },
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Authorization': 'Basic ' + client_id + ':' + client_secret
//       },
//       success: function(error, response, body) {
//         var token = body.access_token;
//         $.ajax({
//             url: 'https://api.spotify.com/v1/search',
//             type: 'GET',
//             data: {
//                 q: "genre:" + '"' + query + '"', 
//                 type: "artist",
//                 limit: "20" 
//             },
//             json: true,
//             headers: {
//               'Access-Control-Allow-Origin': '*',
//               'Authorization': 'Bearer ' + token
//             },
//             success: function(error, response, body) {
//               console.log("error", error)
//               console.log("response", response)
//               console.log("body", body)
//               if (response["artists"]["items"].length > 0) {
//                 var htmlTracker = 0
//                 artist_lst = []
//                 html += '<p class="display-genre">Top tracks for: ' + query + '</p>'  
//                 for (i = 0; i < 5; i++) {
//                   while (true) {
//                     var artist_num = Math.floor(Math.random() * 20.0);
//                     if (!artist_lst.includes(artist_num)) {
//                       break
//                     };
//                   };
//                   artist_lst.push(artist_num);
//                   $.ajax({
//                     url: 'https://api.spotify.com/v1/search',
//                     data: {
//                       q: "artist:" + response["artists"]["items"][artist_num]["name"],
//                       type: "track",
//                       limit: "5"
//                     },
//                     type: 'GET',
//                     json: true,
//                     success: function(track) {
//                       var track_num = Math.floor(Math.random() * 5.0);
//                       var id = track["tracks"]["items"][track_num]["id"];
//                       html += '<iframe class="song" src="https://embed.spotify.com/?uri=spotify:track:' + id + '" frameborder="0" allowtransparency="true"></iframe>'             
//                       htmlTracker++
//                       if (htmlTracker === 5) {
//                         $(".container").html(html);
//                       };
//                     }
//                   })
//                 }
//               } else {
//                 html = "";
//                 html += '<p class="error">hmm...looks like the genre didnt return any results. Try searching for another genre, or disKover new music with our drop down list.</p>';
//                 $(".container").html(html);
//               }
//             $(".container").html(html); 
//             }, 
//         });
//       }
//   });
// };

var renderStarterPage = function() {
  var html = '<div class="col-3">'  
  html += '<p class="opening-msg">Welcome to disKover, an app that allows you to explore the currently most popular songs in any given genre!</p>'
  html += '<form id="opening-button">'; 
  html += '<button class="start-button" type="submit">Start Exploring!</button></form>'
  html += '</div>'
  $(".standard-interface").html(html);
};

$(document).on("submit", "#opening-button", function(event) {
  event.preventDefault();
  var standardHtml = '<div class="col-">'
  standardHtml += '<form id="myform">'
  standardHtml += '<input list="search-ops" class="search" type="text" placeholder="Enter genre here" required>'
  standardHtml += '<datalist id="search-ops" runat="server">'
  for (var i = 0; i < genres.length; i++) {
    standardHtml += '<option value="' + genres[i] + '"/>' 
  }
  standardHtml += '</datalist>'
  standardHtml += '<button class="button" type="submit">Get songs</button>'
  standardHtml += '</form>'
  standardHtml += '</div>'
  $(".standard-interface").html(standardHtml);
  $('#myform').submit(function(e) {
    e.preventDefault();
    var search = $('.search').val();
    $('.search').val("");
    searchGenre(search);
  });
})

renderStarterPage(); 
