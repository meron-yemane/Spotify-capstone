$(document).ready(function() {

  var client_id = 'f508191a9bf4407ca3d35a6c7f8eb795'; // Your client id
  var client_secret = 'e8dd51b0aea94a168594cb1a938cb888'; // Your secret

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
    var html = "";
      $.ajax({
          url: 'https://api.spotify.com/v1/search',
          data: {
              q: "genre:" + query, 
              type: "artist",
              limit: "5" 
          },
          //success: function (response) {
          //    console.log(response);
          //}
          success: function(response) {
            console.log(response)
            var htmlTracker = 0 
            for (i = 0; i < 5; i++) {
              console.log(i)
              console.log(response["artists"]["items"][i]["name"])
              $.ajax({
                url: 'https://api.spotify.com/v1/search',
                data: {
                  q: "artist:" + response["artists"]["items"][i]["name"],
                  type: "track",
                  limit: "1"
                },
                success: function(track) {
                  console.log(track)
                  console.log(track["tracks"]["items"][0]["name"]);
                  var id = track["tracks"]["items"][0]["id"];
                  html += '<iframe src="https://embed.spotify.com/?uri=spotify:track:' + id + '" frameborder="0" allowtransparency="true"></iframe>'             
                  htmlTracker++
                  if (htmlTracker === 5) {
                    console.log(html);
                    $(".container").html(html);
                  };
                }
              })
            }
          $(".container").html(html); 
          }, 
      });
  };



  $('#myform').submit(function(e) {
      e.preventDefault();
      console.log("form submitted")
      var search = $('#search').val();
      console.log("Search Term: " + search)
      searchAlbums(search);
  });

})