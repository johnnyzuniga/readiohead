require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const SpotifyWebApi = require('spotify-web-api-node')
const port = 8080;
const cors = require('cors');
const corsOptions = {
  origin: ['http://localhost:5173'], 
};
app.use(cors(corsOptions));

const songs = [];

//SPOTIFY API -- START
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

// Retrieve an access token
spotifyApi.clientCredentialsGrant()
  .then(data => {
    //console.log(data.body)
    spotifyApi.setAccessToken(data.body["access_token"]);
  })
  .catch(error => {
    console.log("Something went wrong when retrieving an access token", error);
});


app.get('/spotify-test', async (req, res) => {
  try {
    const token = await spotifyApi.getAccessToken();

    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        q: 'radiohead',
        type: 'artist',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send('Spotify API error');
  }
});

// Testing
app.get('/', async (req, res) => {
  try {
    const token = await spotifyApi.getAccessToken();

    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        q: 'radiohead',
        type: 'track',
        limit: 5,
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


// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:8080`);
});