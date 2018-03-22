'use strict';

$(document).ready(function(){

//variables to hold topics and other things



            let topics = ['geckos',
                        'turtles',
                        'sloths',
                        'frogs'];
                        //console.log(topics);

    $("#addAnimal").on("click",function() {

            let searchField = $("#animalInput").val()
    

    //POWERED BY GIPHY
    // API KEY : kt3AVxl1bzJdKflIKnVDdxqLJZS6gVAQ

    //get search box to work

            let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchField + "&api_key=kt3AVxl1bzJdKflIKnVDdxqLJZS6gVAQ";
            
            $.ajax({
                url:queryURL,
                method: "GET"
            }).then(function(response){
                console.log(response);


            });




    });

});