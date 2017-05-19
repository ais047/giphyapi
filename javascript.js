var terms = ["anime", "cats", "shiba inu", "gundams"];

      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayGifInfo() {
        $("#gif-view").empty();
        var query = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + query + "&limit=10&api_key=dc6zaTOxFJmzC";

        console.log(queryURL)
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log(response);
          for(var i=0; i < response.data.length; i++){
          var movieDiv = $("<div class='movie'>");
          var rating = response.data[i].rating;
          var pOne = $("<p>").text("Rating: " + rating);
          movieDiv.append(pOne);

          var imgURL = response.data[i].images.fixed_height.url;
          var imgStill = response.data[i].images.fixed_height_still.url;
          var image = $("<img>").attr({"src": imgStill,
                                      "data-still": imgStill,
                                      "data-animated": imgURL});

        
          movieDiv.append(image);

          $("#gif-view").prepend(movieDiv);
        }
        });

      }

      // Function for displaying movie data
      function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < terms.length; i++) {

          var a = $("<button>");
          a.addClass("button");
          a.attr("data-name", terms[i]);
          a.text(terms[i]);

          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a movie button is clicked
      $("#add-query").on("click", function(event) {
        event.preventDefault();
        var look = $("#query-input").val().trim();
        terms.push(look);
        console.log(terms);
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "movie"
      $(document).on("click", ".button", displayGifInfo);

      // Calling the renderButtons function to display the intial buttons
      $(document).ready(function(){
        renderButtons();
      });
  