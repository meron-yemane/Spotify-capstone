var searchGenre = function (query) {
  console.log("Search Called")
  var html = "";
    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: "genre:" + query, 
            type: "artist",
            limit: "5" 
        },
        success: function(response) {
          console.log(response["artists"]["items"])
          if (response["artists"]["items"].length > 0) {
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
                  html += '<iframe class="song" src="https://embed.spotify.com/?uri=spotify:track:' + id + '" frameborder="0" allowtransparency="true"></iframe>'             
                  htmlTracker++
                  if (htmlTracker === 5) {
                    console.log(html);
                    $(".container").html(html);
                  };
                }
              })
            }
          } else {
            console.log("got in")
            html += '<p class="error">hmm...looks like the genre didnt return any results. Try searching for another genre, or disKover new music with our drop down list.</p>';
            $(".container").html(html);
          }
        $(".container").html(html); 
        }, 
    });
};

var renderStarterPage = function() {
  var html = '<p class="opening-msg">Welcome to disKover, an app that allows you to explore a wide variety of genres and discover new music!</p>'  
  html += '<form id="opening-button">'; 
  html += '<button class="start-button" type="submit">Start Exploring!</button></form>'
  $(".standard-interface").html(html);
};

$(document).on("submit", "#opening-button", function(event) {
  event.preventDefault();
  var standardHtml = '<form id="myform">'
  standardHtml += '<input list="search-ops" class="search" type="text" placeholder="Enter genre here" required>'
  standardHtml += '<datalist id="search-ops" class="list">'
  standardHtml += '<option value="Rap"/>'
  standardHtml += '<option value="Blues"/>'
  standardHtml += '<option value="Country"/>'
  standardHtml += '</datalist>'
  standardHtml += '<button class="button" type="submit">Get songs</button>'
  standardHtml += '</form>'
  $(".standard-interface").html(standardHtml);
  $('#myform').submit(function(e) {
    e.preventDefault();
    console.log("form submitted")
    var search = $('.search').val();
    console.log("Search Term: " + search)
    searchGenre(search);
  });
})

renderStarterPage(); 



















