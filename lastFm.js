/* ------------------------------ Last.FM Data ------------------------------ */

const lastfmData = fetch('https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=swoephowx&api_key=8d1394415d95c0771ac9f8247cc7ee17&limit=1&nowplaying=true&format=json')
  .then(
    response => response.json()
  )
  .then(data => {
    // Removes quotes from JSON data
    const formattedTrackname = JSON.stringify(data.recenttracks.track[0].name).replace(/["]+/g, '')
    const formattedArtistname = JSON.stringify(data.recenttracks.track[0].artist['#text']).replace(/["]+/g, '')
    document.getElementById("track").textContent = formattedTrackname
    document.getElementById("artist").textContent = formattedArtistname
  });