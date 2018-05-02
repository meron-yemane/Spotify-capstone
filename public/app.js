const genres = ["Rap", "House", "Rock", "Pop", "Country", "Classical", "Latin", "R&B"]; 

var renderStarterPage = function() {
  var html = '<div class="col-3">'  
  html += '<p class="opening-msg">Welcome to disKov, an app that allows you to explore the currently most popular songs in any given genre!</p>'
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
    $.ajax({
      data: JSON.stringify(search),
      contentType: "application/json",
      url: "/genresearch",
      type: "GET"
    }).done(function(html) {
      $(".container").html(html);
    })
  });
})

renderStarterPage(); 
