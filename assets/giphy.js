'use strict';

$(document).ready(() => {

    let topics = ['geckos',
                'turtles',
                'sloths',
                'frogs'];

    function makeBtns() {
        for (let i = 0; i < topics.length; i++) {
            const animalBtns = $("<button>");
                animalBtns.addClass("animal-btn");
                animalBtns.attr("anml-name", topics[i]);
                animalBtns.text(topics[i]);
                animalBtns.val(topics[i]);
                $("#animalButtons").append(animalBtns);
        }        
    }
    makeBtns();

    $("#addAnimal").on("click", e => {
        e.preventDefault();
        $("#animalButtons").empty();
        let topic = $("#animalInput").val().trim();
            console.log(topic);
            topics.push(topic);
            makeBtns();
        });

    //POWERED BY GIPHY
    // API KEY : kt3AVxl1bzJdKflIKnVDdxqLJZS6gV
    //querrying API and getting search field to pull up GIFs from array

    $(document).on("click", '.animal-btn', function(e) {
        e.preventDefault()
        $("#animals").empty();

        let data = ($(this).attr("anml-name"));
        let topic = data;
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=kt3AVxl1bzJdKflIKnVDdxqLJZS6gVAQ";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(response => {
                $("#animals").empty();
                for ( let j = 0 ; j < response.data.length ; j++) {
                    const animalTemplate = `<div class="pen">
                    <p class="rating"> Rating: ${(response.data[j].rating).toUpperCase()}</p>
                    <img class="jpeg" data-jpeg_src="${response.data[j].images.original.url}" src="${response.data[j].images.downsized_still.url}" alt="gif">  </img>
                    </div>`;           
                    $("#animals").append(animalTemplate);
                }    
            })
    });

    $(document).on('mouseenter', '.jpeg', function() {
        $(this).data('img_src', $(this).attr('src'));
        $(this).attr('src', $(this).data('jpeg_src'));
    });

    $(document).on('mouseleave', '.jpeg', function() {
        $(this).attr('src', $(this).data('img_src'));
    });

});
    