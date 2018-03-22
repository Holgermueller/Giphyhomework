'use strict';

$(document).ready(function(){
//variables to hold topics and other things



            let topics = ['geckos',
                        'turtles',
                        'sloths',
                        'frogs'];

            let searchField = $("#animalInput").val()
    //console.log(searchField);

    //POWERED BY GIPHY

    // API KEY : kt3AVxl1bzJdKflIKnVDdxqLJZS6gVAQ

            let queryURL = "https://api.giphy.com/v1/gifs/search?q=geckos&api_key=kt3AVxl1bzJdKflIKnVDdxqLJZS6gVAQ";
            
            $.ajax({
                url:queryURL,
                method: "GET"
            }).then(function(response){
                console.log(response);
            })






});