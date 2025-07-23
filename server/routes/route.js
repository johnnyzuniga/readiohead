const axios = require('axios');
const express = require('express');
const router = express.Router();

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

module.exports = router;
