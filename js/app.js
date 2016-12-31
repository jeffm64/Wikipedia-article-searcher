jQuery(document).ready(function() {
  
  //variables
  var searchWord;
  var url;

  //search button functionality
  $(".search-button").click(function() {
    //puts your searched word into search terms for the wikipedia api url
    searchWord = $(".searchbar").val();
    url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchWord + "&format=json&callback=?";

    $.ajax({
      type: "GET",
      url: url,
      dataType: "json",
      success: function(data) {
       //clears previous list
       $(".search-list").html("");
       
        //clears the search bar
       $(".searchbar").val("");
       //reverses the data so the most relevant items appear first rather than last
       data[1].reverse();
       data[2].reverse();
       data[3].reverse();
       //cycles and adds search items/descriptions/and links
       for(var i = 0;i<data[1].length;i++) {
         //adds list with item and description and link
         $(".search-list").prepend("<a href = '" + data[3][i] + "'><li class='search-result'><h4 class='search-item'>" + data[1][i] + "</h4><p class='search-description'>" + data[2][i] + "</p></li></a>");
       };       
     },
     error: function(data) {
       alert("Error");
      }
    });
  });
  $('.searchbar').on('keydown', function (e) {
        if (e.which == 13) {
          $(".search-button").click();  
        }
    });
});