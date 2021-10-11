console.log('animanoir.js loaded.')

/* ------------------------------ Last.FM Data ------------------------------ */

const lastfmData = fetch('https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=swoephowx&api_key=8d1394415d95c0771ac9f8247cc7ee17&limit=1&nowplaying=true&format=json')
  .then(
    response => response.json()
  )
  .then(data => {
    console.log(data)
    document.getElementById("track").textContent=JSON.stringify(data.recenttracks.track[0].name);
    document.getElementById("artist").textContent=JSON.stringify(data.recenttracks.track[0].artist['#text']);
  });



console.log(lastfmData)