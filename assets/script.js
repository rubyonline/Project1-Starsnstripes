
// function search() {
//     var lyrics = document.getElementById("lyrics-input").value;
//     var apiKey = "3b7e9248b894731f9f881e9b297fd717";
//     var encodedLyrics = encodeURIComponent(lyrics);
//     var url = `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=${encodeURIComponent(lyrics)}&apikey=${apiKey}`;
// }

// fetch(url)
//     .then(response => response.json())
//     .then(data => {
//         var song = data.message.body.track;
//         var songTitle = data.message.body.track;
//         var artistName = song.artist_name;
//         var albumName = song.album_name;
//         var output = document.getElementById("output");
//         output.innerHTML = `<p><strong>${songTitle}</strong> by ${artistName} (from the album ${albumName})</p>`;
//     })
//     .catch(error => console.error(error));

// var searchBtn = document.getElementById("search-button");
// searchBtn.addEventListener("click", search);
var artistHeader = document.querySelector("#artist-header")
var artistParagraph = document.querySelector("#artist-paragraph")
var artistList = document.querySelector("#artist-list")

var currentArtistID = 0

var lyricHeader = document.querySelector("#lyric-header")
var lyricParagraph = document.querySelector("#lyric-paragraph")
var lyricList = document.querySelector("#lyric-list")

function artistSearch(e) {
    e.preventDefault();
    var searchedArtist = document.getElementById("artist-search-input").value;
    var url = `https://api.musixmatch.com/ws/1.1/artist.search?q_artist=${searchedArtist}&apikey=3b7e9248b894731f9f881e9b297fd717`;
  
    fetch(url)
      .then(response => response.json())
      .then(function (data) {
        console.log(data);
        artistHeader.textContent = data.message.body.artist_list[0].artist.artist_name;

        var currentArtistID = data.message.body.artist_list[0].artist.artist_id;
        console.log(currentArtistID);

        fetch(`https://api.musixmatch.com/ws/1.1/artist.albums.get?artist_id=${currentArtistID}&apikey=3b7e9248b894731f9f881e9b297fd717`)
            .then(responseTwo => responseTwo.json())
            .then(function(albumdata){
                console.log(albumdata)

                for (let i = 0; i < albumdata.message.body.album_list.length; i++) {
                    var albumName = albumdata.message.body.album_list[i].album.album_name;
                
                    var artistList = document.createElement('li');
                    artistList.textContent = albumName;
                    document.querySelector("#artist-list").append(artistList)

            }
        })
        .catch(error => console.error(error));
      })
      .catch(error => console.error(error));

  }

var artistSearchButton = document.getElementById("artist-search-button");
artistSearchButton.addEventListener("click", artistSearch);


function lyricSearch(e) {
    e.preventDefault();
    var searchedLyric = document.getElementById("lyric-search-input").value;
    var url = `https://api.musixmatch.com/ws/1.1/track.search?q_lyrics=${searchedLyric}&apikey=3b7e9248b894731f9f881e9b297fd717`;

    fetch(url)
        .then(response => response.json())
        .then(function (data) {
            console.log(data);
        });
}

var lyricSearchButton = document.getElementById("lyric-search-button");
lyricSearchButton.addEventListener("click", lyricSearch);