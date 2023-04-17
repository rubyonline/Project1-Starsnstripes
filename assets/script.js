
function search() {
    var lyrics = document.getElementById("lyrics-input").value;
    var apiKey = "YOUR_API_KEY"; 
    var encodedLyrics = encodeURIComponent(lyrics);
    var url = `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=${encodeURIComponent(lyrics)}&apikey=${apiKey}`;
}

fetch(url)
.then(response => response.json())
.then(data => {
    var song = data.message.body.track;
    var songTitle = data.message.body.track;
    var  artistName = song.artist_name;
    var albumName = song.album_name;
    var output = document.getElementById("output");
    output.innerHTML = `<p><strong>${songTitle}</strong> by ${artistName} (from the album ${albumName})</p>`;
    })
    .catch(error => console.error(error));
   
    var searchBtn = document.getElementById("search-button");
searchBtn.addEventListener("click", search);