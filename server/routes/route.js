const axios = require('axios');
const express = require('express');
const router = express.Router();

const songlist = [
  { name: "Creep", artist:'Radiohead' , url: "https://ia803205.us.archive.org/1/items/radiohead-creep_202006/Radiohead%20-%20Creep.mp3" },
  { name: "High and Dry", artist:'Radiohead' , url: "https://ia802302.us.archive.org/21/items/radiohead-high-dry-live-package/01%20-%20High%20%26%20Dry.mp3" }
];

router.get('/', (req, res) => {
  res.send({ songlist });
});

module.exports = router;

/* SPOTIFY API GET

router.get('/', async (req, res) => {
  const spotifyApi = req.app.locals.spotifyApi;

  try {
    const token = spotifyApi.getAccessToken();

    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        q: 'radiohead',
        type: 'track',
        limit: 4,
      },
    });

    const songNames = response.data.tracks.items.map(track => track.name);

    res.send({
      songs: songNames,
      message: 'Hello from the server!'
    });

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send('Spotify API error');
  }
});
*/
