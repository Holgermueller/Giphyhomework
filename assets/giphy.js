'use strict';

$(document).ready(function(){

//initial array of topics

    let topics = ['geckos',
                'turtles',
                'sloths',
                'frogs'];

        //append buttons for array

        function makeBtns(){
            for (let i = 0; i < topics.length; i++) {
                const animalBtns = $("<button>");
                    animalBtns.addClass("animal-btn");
                    animalBtns.attr("anml-name", topics[i]);
                    animalBtns.text(topics[i]);
                    animalBtns.val(topics[i]);
                    $("#animalButtons").append(animalBtns);
            }        
        }
    //append a new button when a new animal is searched

    $("#addAnimal").on("click", function(e) {
        e.preventDefault() //use this to prevent some form default functions
        $("#animalButtons").empty();
        let topic = $("#animalInput").val().trim();
            console.log(topic);
            topics.push(topic);
            makeBtns();


    //POWERED BY GIPHY
    // API KEY : kt3AVxl1bzJdKflIKnVDdxqLJZS6gV
    //querrying API and getting search field to pull up GIFs from array

        $("#animalButtons").on("click",function(e) {
            e.preventDefault()
            $("#animals").empty();

            let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=kt3AVxl1bzJdKflIKnVDdxqLJZS6gVAQ";

                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function(response) {
                    //console.log(response);
                    //create DIV to append rating
                    //create DIV to append GIFs
                    $("#animals").empty();
                    for ( let j = 0 ; j < response.data.length ; j++) {
                        const animalTemplate = `<div class="pen">
                        <p class="rating"> Rating: ${response.data[j].rating}</p>
                        <img src="${response.data[j].images.original.url}" class="jpeg">  </img>
                        </div>`;
                        //append the GIF to DOM            
                        $("#animals").append(animalTemplate);
                        console.log(animalTemplate);
                    }    
                })
        });

    });


//add stop/start limit to GIFs play




});
    