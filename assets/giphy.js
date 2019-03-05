"use strict";

$(document).ready(() => {
  let topics = ["geckos", "turtles", "sloths", "frogs", "rabbits"];

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
    let topic = $("#animalInput")
      .val()
      .trim();
    topics.push(topic);
    makeBtns();
  });

  //POWERED BY GIPHY
  $(document).on("click", ".animal-btn", function(e) {
    e.preventDefault();
    $("#animals").empty();
    let data = $(this).attr("anml-name");
    let topic = data;
    let queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      topic +
      "&api_key=kt3AVxl1bzJdKflIKnVDdxqLJZS6gVAQ";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(response => {
      $("#animals").empty();
      $.map(response.data, gif => {
        let gifRating = gif.rating;
        let gifID = gif.id;
        let stillGif = gif.images.downsized_still.url;
        let movingGif = gif.images.downsized_medium.url;

        let gridItem = $("<div>").addClass("grid-item");
        let imgDIV = $("<div>").addClass("single-gif");
        let rating = $(
          `<p class="rating">Rating: ${gifRating.toUpperCase()}</p>`
        );
        let gifIMG = $("<img alt='img'>")
          .addClass("jpeg")
          .attr("src", stillGif)
          .attr("data-jpeg_src", movingGif);

        let buttonContainer = $("<div>").addClass("button-container");
        let downloadLink = $("<a download>")
          .attr("target", "_blank")
          .attr("href", gif.images.original.url);
        let downloadButton = $("<button>")
          .addClass("download-button")
          .text("Download");
        let favoriteButton = $("<input type='submit' value='Favorite'>")
          .addClass("favorite-button")
          .attr("id", "favorite")
          .attr("data-index", gifID)
          .attr("data-rating", gifRating)
          .attr("src", stillGif)
          .attr("data-jpeg_src", movingGif);

        $("#animals").append(gridItem);
        gridItem.append(imgDIV);
        downloadLink.append(downloadButton);
        buttonContainer.append(downloadLink).append(favoriteButton);
        imgDIV
          .append(rating)
          .append(gifIMG)
          .append(buttonContainer);
      });

      let faveGifs = JSON.parse(localStorage.getItem("faveGifs")) || [];
      $(document).on("click", "#favorite", function() {
        let id = $(this).data("index");
        let rating = $(this).data("rating");
        let stillGif = $(this).attr("src");
        let movingGif = $(this).data("jpeg_src");
        let faveGif = {
          id,
          rating,
          stillGif,
          movingGif
        };
        faveGifs.push(faveGif);
        localStorage.setItem("faveGifs", JSON.stringify(faveGifs));
        populateFaves();
      });
    });
  });

  function populateFaves() {
    let faveGifs = JSON.parse(localStorage.getItem("faveGifs"));
    $("#favoriteGifs").empty();

    $.map(faveGifs, faveGif => {
      let gifID = faveGif.id;
      let rating = faveGif.rating.toUpperCase();
      let stillGif = faveGif.stillGif;
      let movingGif = faveGif.movingGif;

      let gridItem = $("<div>").addClass("grid-item");
      let faveDiv = $("<div>").addClass("fave-gif");
      let faveRating = $(`<p class='rating'>Rating: ${rating} </p>`);
      let faveImg = $("<img alt='img'>")
        .addClass("jpeg")
        .attr("src", stillGif)
        .attr("data-jpeg_src", movingGif);

      let buttonContainer = $("<div>").addClass("button-container");
      let removeButton = $("<button>")
        .addClass("remove-button")
        .attr("id", "remove")
        .attr("data-remove_index", gifID)
        .text("Remove");

      $("#favoriteGifs").append(gridItem);
      gridItem.append(faveDiv);
      buttonContainer.append(removeButton);
      faveDiv
        .append(faveRating)
        .append(faveGif)
        .append(faveImg)
        .append(buttonContainer);
    });
  }
  populateFaves();

  $(document).on("click", "#remove", function(id) {
    let faveGifs = localStorage.getItem("faveGifs")
      ? JSON.parse(localStorage.getItem("faveGifs"))
      : [];
    let index;
    for (let i = 0; i < faveGifs.length; i++) {
      if (faveGifs[i].id === id) {
        index = i;
        break;
      }
    }
    if (index === -1) return
    faveGifs.splice(index, 1);
    localStorage.setItem("faveGifs", JSON.stringify(faveGifs));
    populateFaves();
  });

  $(document).on("mouseenter", ".jpeg", function() {
    $(this).data("img_src", $(this).attr("src"));
    $(this).attr("src", $(this).data("jpeg_src"));
  });

  $(document).on("mouseleave", ".jpeg", function() {
    $(this).attr("src", $(this).data("img_src"));
  });
});
