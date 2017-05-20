var add;
var terms = ["anime", "cats", "shiba inu", "gundams"];

$(document).ready(function(){

      
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
          var image = $("<img>").attr({"id" : "img"+i,
                                       "src": imgStill,
                                       "data-still": imgStill,
                                       "data-animated": imgURL,
                                       "state" : "still"
                                    });
          image.addClass("image");
          movieDiv.append(image);
          $("#gif-view").prepend(movieDiv);
        }
        });
      }

      function changestat(){
        var img = $(this).attr("state");
        console.log(img);
        if(img === "still"){
          console.log("dicks");
          $(this).attr({"src": $(this).attr("data-animated"),
                     "state": "animated"
          })
        }
        else if (img === "animated"){
          $(this).attr({"src": $(this).attr("data-still"),
                     "state" : "still"
          })
        

        }
      }

      
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


      $("#add-query").on("click", function(event){
        event.preventDefault();
        var add = $("#query-input").val().trim();
        console.log(add);
        terms.push(add);
        renderButtons();
      });
  



      $(document).on("click", ".button", displayGifInfo);

      $(document).on("click", ".image", changestat);

      $(document).ready(function(){
      renderButtons();
    });

})