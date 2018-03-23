'use strict';

$(document).ready(function(){

//initial array of topics



    let topics = ['geckos',
                'turtles',
                'sloths',
                'frogs',
                ''];

    $("#addAnimal").on("click", function(e) {
        e.preventDefault() //use this to prevent some form default functions
    //POWERED BY GIPHY
    // API KEY : kt3AVxl1bzJdKflIKnVDdxqLJZS6gVAQ

    //querrying API and getting search field to work

            let topic = $("#animalInput").val()
            //console.log(topic);
            let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=kt3AVxl1bzJdKflIKnVDdxqLJZS6gVAQ";
            
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                for ( let j = 0 ; j < response.data.length ; j++) {
                    const animalTemplate = `<div class="pen">
                    <p class="rating"> Rating: ${response.data[j].rating}</p>
                    <img src="${response.data[j].images.original.url}" class="jpeg">  </img>
                    </div>`;

                    $("#animals").append(animalTemplate);
                }

//append the GIF to DOM



//add stop/start limit to GIFs play



//create an element to display the rating



            });
//append buttons
  /*      function renderButtons() {
           $("#animalButtons").empty();
           for (let i = 0; i < topics.lengt; i++) {
               let button = $("<button>");
               button.addClass("animal-button");
               button.attr("data-name", topics[i]);
               button.text(topics[i]);
               $("#animalButtons").append(button);
           }
        } */


    });

});