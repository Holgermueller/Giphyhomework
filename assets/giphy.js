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
                //console.log(response);
                $("#animals").empty();
                $.map(response.data, gif => {
                    //console.log(gif.id);
                    const animalTemplate = `<div class="grid-item">
                    <div id="singleGif" data-index="${gif.id}">
                        <p class="rating"> Rating: ${(gif.rating).toUpperCase()}</p>
                        <img class="jpeg" data-jpeg_src="${gif.images.downsized_medium.url}" src="${gif.images.downsized_still.url}" alt="gif">
                    </div>
                        <div class="button-container">
                            <a href="${gif.source}" download><button id="download" class="download-button">Download</Button></a>
                            <input type="submit" id="favorite" class="favorite-button" value="Favorite" onclick="showIndex(this)">
                        </div>
                    </div>`;           
                    $("#animals").append(animalTemplate);

                    let favoriteGifs = JSON.parse(localStorage.getItem('favoriteGifsArray'));
                    if(!Array.isArray(favoriteGifs)){
                        favoriteGifs = [];
                    }

                    function putFavoritesOnPage() {
                        $('#favorite-gifs').empty();
                        let checkFavoriteGifsList = JSON.parse(localStorage.getItem('favoriteGifsArray'));
                        if(!Array.isArray(checkFavoriteGifsList)){
                            checkFavoriteGifsList = [];
                        }
                    }

                    function showIndex(gif) {
                        let gifIndex = gif.getAttribute("data-index");
                        console.log(gifIndex);
                    }

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
    