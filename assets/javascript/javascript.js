var heroes = ["Iron Man", "Thor", "Batman"];


function renderButtons() {

    // Deleting the heroes prior to adding new heroes
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of heroes
    for (var i = 0; i < heroes.length; i++) {

      // Then dynamicaly generating buttons for each hero in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of hero-btn to our button
      a.addClass("hero-btn");
      // Adding a data-attribute
      a.attr("data-name", heroes[i]);
      // Providing the initial button text
      a.text(heroes[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

  renderButtons();

  $("#add-hero").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var hero = $("#hero-input").val().trim();

    // Adding movie from the textbox to our array
    heroes.push(hero);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });



 
 function displayGifs () {

 var hero = $(this).attr("data-name");
 var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=1SWFYgtgXodOJB4rsmDgtN5WeiVIl1nG&limit=10";


  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    console.log(response);
    $("#gifs-view").empty();

for(var i = 0; i < response.data.length; i++) {
    var heroDiv = $("<div class='hero'>");

    // Storing the rating data
    var rating = response.data[i].rating;

    // Creating an element to have the rating displayed
    var pOne = $("<p>").text("Rating: " + rating);

    // Displaying the rating
    heroDiv.append(pOne);


    var imgURL = response.data[i].images.downsized_still.url;

    // Creating an element to hold the still gif
    var heroesGif = $("<img>").attr("src", imgURL);
    heroesGif.addClass("moving-heroes");
    heroesGif.attr("data-state", "still");
    heroesGif.attr("data-still", imgURL);
    heroesGif.attr("data-animate", response.data[i].images.downsized.url);

    // Appending the image
    heroDiv.append(heroesGif);

    $("#gifs-view").prepend(heroDiv);
    
}

  })

}

$(document).on("click", ".hero-btn", displayGifs);