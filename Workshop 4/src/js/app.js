/**
 * WEB222 – Assignment 04
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
 *      Date:       13th July 2024
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

// For debugging, display all of our data in the console. You can remove this later.
//console.log({ artists, songs }, "App Data");

//document.addEventListener("load", function ()
document.addEventListener("DOMContentLoaded", function () {
  const menu = document.querySelector("#menu");
  const artistName = document.querySelector("#selected-artist");
  const songList = document.querySelector("#songs");

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
    artistName.innerHTML = `<h2>${artist.name}</h2>`;

    //Artist's socials
    //Add a parenthesis to the socials
    artistName.appendChild(document.createTextNode("("));

    artist.urls.forEach((link) => {
      //Create a link to the artist's page
      const a = document.createElement("a");
      a.href = link.url; //href is the url of the link
      a.textContent = link.name; //textContent is the name of the link
      a.target = "_blank"; //Open the link in a new tab
      //Append the link to the artistName
      artistName.appendChild(a);

      artistName.appendChild(document.createTextNode(", "));
    });
    //Remove the last comma
    artistName.removeChild(artistName.lastChild);
    //Add a closing parenthesis
    artistName.appendChild(document.createTextNode(")"));
  }

  //For each artist, show the artist's songs
  function showSongs(artistId) {
    songList.innerHTML = "";

    //Filter the songs by the artistId and remove explicit songs
    const filteredSongs = songs.filter((song) => song.artistId === artistId && !song.explicit);

    //For each song, create a table row
    filteredSongs.forEach((song) => {
      const tr = document.createElement("tr");

      tr.addEventListener("click", function () {
        console.log(song);
      });

      //Create a table cell for the song's title
      const songTitleTd = document.createElement("td");

      //Create a link to the song's page
      const titleLink = document.createElement("a");
      titleLink.href = song.url;
      titleLink.textContent = song.title;
      titleLink.target = "_blank";

      //Append the link to the titleTd
      songTitleTd.appendChild(titleLink);

      //Create a table cell for the song's year
      const yearTd = document.createElement("td");
      yearTd.textContent = song.year;

      //Create a table cell for the song's duration
      const durationTd = document.createElement("td");
      //Convert the duration to minutes and add a colon for the seconds part
      durationTd.textContent = `${Math.floor(song.duration / 60)}:${
        song.duration % 60 < 10 ? "0" : ""
      }${song.duration % 60}`;

      //Append the table cells to the table row
      tr.appendChild(songTitleTd);
      tr.appendChild(yearTd);
      tr.appendChild(durationTd);

      //Append the table row to the songList
      songList.appendChild(tr);
    });
  }

  // Initialize app
  //For each artist, create a button that links to the artist's page
  artists.forEach(createArtistButton);
});
