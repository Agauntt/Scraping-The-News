// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append("<p data-id='" + data[i].id + "'>" + data[i].title + "<br />" + "<a href='" + data[i].link + "'>" +  data[i].link  + "</p>");
    }
  });

  $("#scrapper").click(function() {
      // Send the POST request.
      $.ajax("/scrape", {
        type: "GET"
    }).then(function() {
        console.log("new scrape");
    });
  }).onsubmit="setTimeout(function(){window.location.reload();},10)";

  $(document).on("click", "p", function() {
    console.log("p tag clicked");
  });