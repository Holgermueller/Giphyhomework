'use strict';

$(document).ready(function(){

//initial array of topics

    let topics = ['geckos',
                'turtles',
                'sloths',
                'frogs'];
//append buttons for array

    for (let i = 0; i < topics.length; i++) {
        const animalBtns = $("<button>");
            animalBtns.addClass("animal-btn");
            animalBtns.attr("anml-name", topics[i]);
            animalBtns.text(topics[i]);
            $("#animalButtons").append(animalBtns);
    }


    $("#addAnimal").on("click", function(e) {
        e.preventDefault() //use this to prevent some form default functions
        $("#animals").empty();
        //use search field to append more buttons
        let newBtn = $("animalInput").val();
                newBtn.addClass("animal-btn");
                newBtn.attr("anml-name");
                newBtn.text("#animals");
                $("#animalButtons").append(newBtn);

        });

        

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
                    
                    //append button new button

                    
                
                }

                 });
//add stop/start limit to GIFs play
});
    
