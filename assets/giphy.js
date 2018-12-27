'use strict';

$(document).ready(() => {

    let topics = ['geckos',
                'turtles',
                'sloths',
                'frogs',
                'rabbits'];

    function makeBtns() {
        $.map(topics, topic => {
            const animalBtns = $("<button>");
                animalBtns.addClass("animal-btn");
                animalBtns.attr("anml-name", topic);
                animalBtns.text(topic);
                animalBtns.val(topic);
                $("#animalButtons").append(animalBtns);
        });     
    }
    makeBtns();

    $("#addAnimal").on("click", e => {
        e.preventDefault();
        $("#animalButtons").empty();
        let topic = $("#animalInput").val().trim();
            topics.push(topic);
            makeBtns();
        });

    //POWERED BY GIPHY

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
                console.log(response);
                $("#animals").empty();
                $.map(response.data, gif => {
                    let gifID = gif.id;
                    //console.log(gif.id);
                    let gridItem = $('<div>').addClass("grid-item");
                    let imgDIV = $("<div>").addClass("singleGif");
                    let rating = $(`<p class="rating">Rating: ${(gif.rating).toUpperCase()}</p>`);
                    let gifIMG = $("<img>").addClass("jpeg").attr('src', gif.images.downsized_still.url).attr('data-jpeg_src', gif.images.downsized_medium.url);
                    let buttonContainer = $("<div>").addClass("button-container");
                    let downloadLink = $('<a download>').attr('target', '_blank').attr("href", gif.images.original.url);
                    let downloadButton = $('<button>').addClass('download-button').text("Download");
                    let favoriteButton = $("<input type='submit' value='Favorite'>").addClass("favorite-button");

                    $("#animals").append(gridItem);
                    $(gridItem).append(imgDIV);
                    $(imgDIV).append(rating);
                    downloadLink.append(downloadButton);
                    buttonContainer.append(downloadLink).append(favoriteButton);
                    imgDIV.append(gifIMG).append(buttonContainer);

                    $(document).on('click', '#favorite', () => {
                        // console.log(response.data);
                    });

                });
            });
    });

    $(document).on('mouseenter', '.jpeg', function() {
        $(this).data('img_src', $(this).attr('src'));
        $(this).attr('src', $(this).data('jpeg_src'));
    });

    $(document).on('mouseleave', '.jpeg', function() {
        $(this).attr('src', $(this).data('img_src'));
    });

});
    