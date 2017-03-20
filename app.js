var searchGenre = function (query) {
  var html = "";
    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: "genre:" + '"' + query + '"', 
            type: "artist",
            limit: "20" 
        },
        success: function(response) {
          if (response["artists"]["items"].length > 0) {
            var htmlTracker = 0
            artist_lst = [] 
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
            html += '<p class="error">hmm...looks like the genre didnt return any results. Try searching for another genre, or disKover new music with our drop down list.</p>';
            $(".container").html(html);
          }
        $(".container").html(html); 
        }, 
    });
};

var renderStarterPage = function() {
  var html = '<div class="col-3">'  
  html += '<p class="opening-msg">Welcome to disKover, an app that allows you to explore a wide variety of genres and discover new music!</p>'
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
  standardHtml += '<datalist id="search-ops" class="list">'
  standardHtml += '<option value="Rap"/>'
  standardHtml += '<option value="Blues"/>'
  standardHtml += '<option value="Country"/>'
  standardHtml += '<option value="House"/>'
  standardHtml += '<option value="Rock"/>'
  standardHtml += '<option value="Acid Techno"/>'
  standardHtml += '</datalist>'
  standardHtml += '<button class="button" type="submit">Get songs</button>'
  standardHtml += '</form>'
  standardHtml += '</div>'
  $(".standard-interface").html(standardHtml);
  $('#myform').submit(function(e) {
    e.preventDefault();
    var search = $('.search').val();
    searchGenre(search);
  });
})

renderStarterPage(); 




