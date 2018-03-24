'use strict';

$(document).ready(function(){

//initial array of topics

    let topics = ['geckos',
                'turtles',
                'sloths',
                'frogs'
                ];

//append buttons for array

        for (let i = 0; i < topics.length; i++) {
            let animalButton = $('<button>');
            animalButton.addClass("animal-button");
            animalButton.attr("data-name", topics[i]);
            animalButton.text(topics[i]);
            $("#animalButtons").append(animalButton);

//create new buttons when animal name is typed into search field



    $("#addAnimal").on("click", function(e) {
        e.preventDefault() //use this to prevent some form default functions
    //POWERED BY GIPHY
    // API KEY : kt3AVxl1bzJdKflIKnVDdxqLJZS6gVAQ

    //querrying API and getting search field to work

            let topic = $("#animalInput").val()
            console.log(topic);
            let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=kt3AVxl1bzJdKflIKnVDdxqLJZS6gVAQ";
            
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                //console.log(response);
                for ( let j = 0 ; j < response.data.length ; j++) {
                    const animalTemplate = `<div class="pen">
                    <p class="rating"> Rating: ${response.data[j].rating}</p>
                    <img src="${response.data[j].images.original.url}" class="jpeg">  </img>
                    </div>`;
                    //create an element to display the rating (above code)
                    //append the GIF to DOM
                    $("#animals").append(animalTemplate);
                }

                 });
//add stop/start limit to GIFs play
            });
    }
});