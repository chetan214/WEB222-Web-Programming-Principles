/**
 * WEB222 – Assignment 05
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Chetan Arora
 *      Student ID: 100976240
 *      Date:       7th Aug 2024
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

// For debugging, display all of our data in the console. You can remove this later.
//console.log({ artists, songs }, "App Data");

//document.addEventListener("load", function ()
document.addEventListener("DOMContentLoaded", function () {
  const menu = document.querySelector("#menu");
  const artistDetails = document.querySelector("#selected-artist");
  const songList = document.querySelector(".card-container");

  function createArtistButton(artist) {
    const button = document.createElement("button");
    button.textContent = artist.name;
    //On click of the artist button, show the artist's info and songs
    button.addEventListener("click", function () {
      showArtistInfo(artist);
      showSongs(artist.artistId);
    });
    //Append the button to the menu
    menu.appendChild(button);
  }

  function showArtistInfo(artist) {
    //Name of the artist
    artistDetails.innerHTML = "";
    const artistInfo = document.createElement("div");
    artistInfo.classList.add("artist-info");

    //Image of the artist
    const artistImage = document.createElement("img");
    artistImage.classList.add("artist-image");
    artistImage.src = artist.artistImageUrl;
    artistInfo.appendChild(artistImage);

    //Name of the artist with social media links
    const artistNameSocials = document.createElement("div");
    artistNameSocials.classList.add("artist-name-socials");

    //Name of the artist
    const artistName = document.createElement("h3");
    artistName.classList.add("artist-name");
    artistName.textContent = artist.name;
    artistNameSocials.appendChild(artistName);

    //Social media links
    const socials = document.createElement("div");
    socials.classList.add("socials");

    artist.urls.forEach((link) => {
      //Create a link to the artist's page
      const a = document.createElement("a");
      a.classList.add("social-link");
      a.href = link.url; //href is the url of the link
      a.target = "_blank"; //Open the link in a new tab

      //Instead of text links, I used icon of the social media links for better visual effect
      //Create an image for the link
      const img = document.createElement("img");
      img.classList.add("social-link-image");
      //Set the image based on the type of link
      if (link.name === "Spotify") {
        img.src = "https://cdn-icons-png.flaticon.com/512/174/174872.png";
      } else if (link.name === "YouTube") {
        img.src = "https://cdn-icons-png.flaticon.com/512/174/174883.png";
      } else if (link.name === "Instagram") {
        img.src = "https://cdn-icons-png.flaticon.com/512/2111/2111463.png";
      }

      a.appendChild(img); //Append the image to the link
      socials.appendChild(a); //Append the link to the socials
    });

    //Append the socials to the artistNameSocials
    artistNameSocials.appendChild(socials);
    //Append the artistNameSocials to the artistDetails
    artistInfo.appendChild(artistNameSocials);

    //Finally, append the artistInfo to the artistDetails
    artistDetails.appendChild(artistInfo);
  }

  //For each artist, show the artist's songs
  function showSongs(artistId) {
    songList.innerHTML = "";

    //Filter the songs by the artistId and remove explicit songs
    const filteredSongs = songs.filter((song) => song.artistId === artistId && !song.explicit);

    //For each song, create a card
    filteredSongs.forEach((song) => {
      const card = createSongCard(song);
      //Append the card to the songList
      songList.appendChild(card);
    });
  }

  // Create a song card
  function createSongCard(song) {
    // Create a <div> to hold the card
    const card = document.createElement("div");
    // Add the .card class to the <div>
    card.classList.add("card");

    // Create a song image, use the .card-image class
    const songImg = document.createElement("img");
    songImg.classList.add("card-image");
    songImg.src = song.imageUrl;
    // Add a click event listener to the image
    songImg.addEventListener("click", function () {
      window.open(song.url, "_blank");
    });
    card.appendChild(songImg);

    // Create a heading for the song title
    const songTitleLink = document.createElement("a");
    const songTitle = document.createElement("h3");
    songTitleLink.classList.add("card-title");
    // Set the song's title as the link's text
    songTitleLink.textContent = song.title;
    songTitleLink.href = song.url;
    songTitleLink.target = "_blank";
    songTitle.appendChild(songTitleLink); //Append the link to the song title
    card.appendChild(songTitle); //Append the song title to the card

    //Create a <div> for the year and duration of the song
    const yearDurationDiv = document.createElement("div");
    yearDurationDiv.classList.add("card-year-duration");

    // Create a <div> element for the duration
    const songDuration = document.createElement("div");
    songDuration.classList.add("card-duration");
    songDuration.textContent = `${Math.floor(song.duration / 60)}:${
      song.duration % 60 < 10 ? "0" : ""
    }${song.duration % 60}`;
    // Add the time to the year duration div
    yearDurationDiv.appendChild(songDuration);

    //Create a <div> for the year of the song
    const songYearDiv = document.createElement("div");

    const songYear = document.createElement("time");
    songYear.classList.add("card-year");
    songYear.textContent = song.year;
    // Add the year to the year div
    songYearDiv.appendChild(songYear);
    // Add the year div to the year duration div
    yearDurationDiv.appendChild(songYearDiv);

    //Finally, append the year duration div to the card
    card.appendChild(yearDurationDiv);

    // Return the card’s <div> element to the caller
    return card;
  }
  // Initialize app
  //For each artist, create a button that links to the artist's page
  artists.forEach(createArtistButton);

  //Show the artist detail of the first artist always by default
  if (artists.length > 0) {
    showArtistInfo(artists[0]);
    showSongs(artists[0].artistId);
  }
});
