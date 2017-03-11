$(document).ready(function() {

  /**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

//var request = require('request'); // "Request" library

  var client_id = 'f508191a9bf4407ca3d35a6c7f8eb795'; // Your client id
  var client_secret = 'e8dd51b0aea94a168594cb1a938cb888'; // Your secret

  // // find template and compile it
  // var templateSource = document.getElementById('results-template').innerHTML,
  //     template = Handlebars.compile(templateSource),
  //     resultsPlaceholder = document.getElementById('results'),
  //     playingCssClass = 'playing',
  //     audioObject = null;

  var fetchTracks = function (albumId, callback) {
      $.ajax({
          url: 'https://api.spotify.com/v1/albums/' + albumId,
          success: function (response) {
              callback(response);
          }
      });
  };

  var searchAlbums = function (query) {
    console.log("Search Called")
      $.ajax({
          url: 'https://api.spotify.com/v1/search',
          data: {
              q: "genre:" + query, 
              type: "artist" 
          },
          //success: function (response) {
          //    console.log(response);
          //}
          success: function(response) {
            console.log(response)
            for (i = 0; i < response["artists"]["items"].length; i++) {
              console.log(response["artists"]["items"][i]["name"])
              $.ajax({
                url: 'https://api.spotify.com/v1/search',
                data: {
                  q: "artist:" + response["artists"]["items"][i]["name"],
                  type: "track"
                },
                success: function(track) {
                  console.log(track["tracks"]["items"][0]["name"]);
                }
              })
            }
            


            console.log(response.length)
            //for (i = 0; i < response.length; i++) {
              //console.log("fh");
              //console.log(response[i][id]);
            //};
          }, 
      });
  };


  // results.addEventListener('click', function(e) {
  //     var target = e.target;
  //     if (target !== null && target.classList.contains('cover')) {
  //         if (target.classList.contains(playingCssClass)) {
  //             audioObject.pause();
  //         } else {
  //             if (audioObject) {
  //                 audioObject.pause();
  //             }
  //             fetchTracks(target.getAttribute('data-album-id'), function(data) {            
  //                 audioObject = new Audio(data.tracks.items[0].preview_url);
  //                 audioObject.play();
  //                 target.classList.add(playingCssClass);
  //                 audioObject.addEventListener('ended', function() {
  //                     target.classList.remove(playingCssClass);
  //                 });
  //                 audioObject.addEventListener('pause', function() {
  //                     target.classList.remove(playingCssClass);
  //                });
  //             });
  //         }
  //     }
  // });


  $('#myform').submit(function(e) {
      e.preventDefault();
      console.log("form submitted")
      var search = $('#search').val();
      console.log("Search Term: " + search)
      searchAlbums(search);
  });

})