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
  $(document).on("click", '.animal-btn', function (e) {
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
      $.map(response.data, gif => {
        let gifRating = gif.rating;
        let gifID = gif.id;
        let gridItem = $('<div>').addClass("grid-item");
        let imgDIV = $("<div>").addClass("singleGif");
        let rating = $(`<p class="rating">Rating: ${(gifRating).toUpperCase()}</p>`);
        let gifIMG = $("<img>").addClass("jpeg")
          .attr('src', gif.images.downsized_still.url)
          .attr('data-jpeg_src', gif.images.downsized_medium.url);
        let buttonContainer = $("<div>").addClass("button-container");
        let downloadLink = $('<a download>').attr('target', '_blank').attr("href", gif.images.original.url);
        let downloadButton = $('<button>').addClass('download-button').text("Download");
        let favoriteButton = $("<input type='submit' value='Favorite'>")
          .addClass("favorite-button").attr("id", "favorite").attr('data-index', gifID)
          .attr('data-rating', gifRating).attr('src', gif.images.downsized_still.url);

        $("#animals").append(gridItem);
        gridItem.append(imgDIV);
        imgDIV.append(rating);
        downloadLink.append(downloadButton);
        buttonContainer.append(downloadLink).append(favoriteButton);
        imgDIV.append(gifIMG).append(buttonContainer);
      });

      let faveGifs = JSON.parse(localStorage.getItem('faveGifs')) || [];
      let placeForFaveGifs = $("#favoriteGifs");

      $(document).on('click', '#favorite', function () {
        let id = $(this).data('index');
        let rating = $(this).data('rating');
        let gif = $(this).attr('src');
        let faveGif = {
          id,
          rating,
          gif
        };
        faveGifs.push(faveGif);
        localStorage.setItem('faveGifs', JSON.stringify(faveGifs));
        populateFaves();
      });
    });
  });

  function populateFaves() {
    let faveGifs = JSON.parse(localStorage.getItem('faveGifs'));
    $("#favoriteGifs").empty();
    $.map(faveGifs, faveGif => {
      let rating = faveGif.rating;
      let still = faveGif.gif;
      let gifID = faveGif.id;
      let gridItem = $('<div>').addClass("grid-item");
      let faveDiv = $("<div>").addClass("fave-gif");
      let faveRating = $(`<p class='rating'>Rating: ${rating} </p>`);
      let removeButton = $("<button>").addClass("remove-button")
        .attr("id", "remove").attr('data-remove_index', gifID).text("Remove");
      let faveStill = $("<img>").addClass("jpeg")
        .attr('src', still)
        .attr('data-jpeg_src');

      $("#favoriteGifs").append(gridItem);
      gridItem.append(faveDiv);
      faveDiv.append(faveRating);
      faveDiv.append(faveGif).append(faveStill);
      faveDiv.append(removeButton);
    });

    function removeAFavorite() {
      $(document).on('click', '#remove', function() {
        // let gifToRemove = faveGifs;
          console.log($(this).data('remove_index'));       
      });
    }
    removeAFavorite();
  }
  populateFaves();

  $(document).on('mouseenter', '.jpeg', function () {
    $(this).data('img_src', $(this).attr('src'));
    $(this).attr('src', $(this).data('jpeg_src'));
  });

  $(document).on('mouseleave', '.jpeg', function () {
    $(this).attr('src', $(this).data('img_src'));
  });
});
