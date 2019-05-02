// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append("<p data-id='" + data[i]._id + "' data-toggle='collapse' data-target='#" + data[i]._id + '"> + data[i].title + "<br />" + "<a href=' + data[i].link + "'>" +  data[i].link  + "</p>");
      $("#articles").append("<div class='comment-box' id='" + data[i]._id + "' data-id='" + data[i]._id + "'></div>");
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
    var thisID = $(this).attr("data-id");
    console.log("p tag clicked");
    console.log(thisID);
    $.ajax({
      method: "GET",
      url: "/articles/" + thisID
    })
      .then(function(data) {
        console.log(data);
      })
    $("#comment-modal").modal("show");
    $(".modal-footer").prepend('<button type="button" data-id="' + thisID + '" id="comment-submit" class="btn btn-primary">Save Comment</button>');
  });


  $(".modal-footer").on("click", "#comment-submit", function() {
    var thisId = $(this).attr("data-id");
    console.log(thisId);
    var title = $("#comment-name").val();
    console.log("work damnit");
    console.log(title);
    console.log($("#comment-input"));
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#comment-name").val(),
        // Value taken from note textarea
        body: $("#comment-input").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data.title);
        console.log(data.body);
      $(".comment-box").attr("data-id", thisId).append(data.title + ": " + data.body);
      });
    })  