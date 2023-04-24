//Adding our variables and their locations
var artistHeader = document.querySelector("#artist-header")
var artistParagraph = document.querySelector("#artist-paragraph")
var artistList = document.querySelector("#artist-list")

var currentArtistID = 0

var lyricHeader = document.querySelector("#lyric-header")
var lyricParagraph = document.querySelector("#lyric-paragraph")
var lyricList = document.querySelector("#lyric-list")

//This function will provide us with the artist and all of their albums
function artistSearch(e) {
    //prevents page from reloading
    e.preventDefault();
    //Declaring our variables specific to this funciton
    var searchedArtist = document.getElementById("artist-search-input").value;
    var url = `https://api.musixmatch.com/ws/1.1/artist.search?q_artist=${searchedArtist}&apikey=3b7e9248b894731f9f881e9b297fd717`;
    
    //Retrieve the data from the api URL about the closest artist's name
    fetch(url)
      .then(response => response.json())
      .then(function (data) {

        //Logs the data in the console
        console.log(data);
        artistHeader.textContent = data.message.body.artist_list[0].artist.artist_name;

        var currentArtistID = data.message.body.artist_list[0].artist.artist_id;
        console.log(currentArtistID);

        //Stores last searched item to localstorage
        localStorage.setItem("leftSearch", searchedArtist);

        //Retrieve the data from the api URL about the artist's albums
        fetch(`https://api.musixmatch.com/ws/1.1/artist.albums.get?artist_id=${currentArtistID}&apikey=3b7e9248b894731f9f881e9b297fd717`)
        .then(responseTwo => responseTwo.json())
        .then(function(albumdata){

            //Logs the data in the console
            console.log(albumdata)

            //Makes a list item for each album in an artist's portfolio
            for (let i = 0; i < albumdata.message.body.album_list.length; i++) {
                var albumName = albumdata.message.body.album_list[i].album.album_name;
                
                var artistList = document.createElement('li');
                artistList.textContent = albumName;
                document.querySelector("#artist-list").append(artistList)

            }
        })

        //Catches any errors and displays them to the console
        .catch(error => console.error(error));
      })
      .catch(error => console.error(error));

  }

var artistSearchButton = document.getElementById("artist-search-button");
artistSearchButton.addEventListener("click", artistSearch);


//This funciton provides us with the lyrics to a song by searching the song name
function lyricSearch(e) {
    //Prevents page from reloading
    e.preventDefault();
    //Declaring our variables specific to this function
    var searchedLyric = document.getElementById("lyric-search-input").value;
    var url =  `https://api.vagalume.com.br/search.excerpt?apikey=4d665e0336c25ed3b44dd8d92055b33d&q=${searchedLyric}&limit=5`;

    //Retrieve data from api url
    fetch(url)
        .then(response => response.json())
        .then(function (data) {

            //Logs data in the console
            console.log(data);
            var currentSongID = data.response.docs[0].id;

            //Stores last searched item to localstorage
            localStorage.setItem("rightSearch", searchedLyric);

            //Retrieve data regarding lyric text
            fetch(`https://api.vagalume.com.br/search.php?apikey=4d665e0336c25ed3b44dd8d92055b33d&musid=${currentSongID}`)
            .then(responseTwo => responseTwo.json())
            .then(function (lyricData){

                //Logs data to console
                console.log(lyricData)

                //Prints to page
                var lyrics = lyricData.mus[0].text;
                var lyricPrint = document.createElement('p');

                lyricPrint.textContent = lyrics;
                document.querySelector("#lyric-list").append(lyricPrint);

            })


        });
 }
 var lyricSearchButton = document.getElementById("lyric-search-button");
 lyricSearchButton.addEventListener("click", lyricSearch);