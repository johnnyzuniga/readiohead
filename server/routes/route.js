const path = require('path');
const express = require('express');
const router = express.Router();
const fs = require('fs');

const songlist = [
  { name: "Gymnopédie No. 1", artist:'Erik Satie' , emotion: 'Neutral' ,url: "https://ia601307.us.archive.org/5/items/ErikSatieGymnopdieNo.1/Erik%20Satie%20-%20Gymnop%C3%A9die%20No.1.mp3" },
  { name: "Main Theme", artist:'Animal Crossing: New Horizons' , emotion: 'Happy', url: "https://ia903408.us.archive.org/10/items/AnimalCrossingNewHorizonsOSTRip/001%20-%20New%20Horizons%20Main%20Theme.mp3" },
  { name: "Lux Aeterna", artist:'Clint Mansell' , emotion: 'Angry' ,url: "https://ia800406.us.archive.org/11/items/LuxAeterna_928/LuxAeternaByClintMansell.mp3" },
  { name: "Spiegel Im Spiegel", artist:"Arvo Part", emotion:'Sad',url:"https://ia801602.us.archive.org/5/items/arvopartspiegelimspegel/01SpiegelImSpiegel.mp3"},
  { name: "Symphony No. 5", artist:"Ludwig Van Beethoven", emotion:'Fear',url:"https://dn721904.ca.archive.org/0/items/SymphonyNo.5/Ludwig_van_Beethoven_-_symphony_no._5_in_c_minor_op._67_-_i._allegro_con_brio.mp3"},
  { name: "Toccata and Fugue in D Minor", artist:"Johann Sebastian Bach", emotion:'Surprise',url:"https://ia801609.us.archive.org/16/items/ToccataAndFugueInDMinor/12ToccataAndFugueInDMinor_vbr.mp3"}
];

router.get('/', (req, res) => {
  const emotionsPath = path.join(__dirname, '..', 'emotions', 'chunks_emotions_data.json');
  const chunksPath = path.join(__dirname, '..', 'emotions', 'chapters_chunks.json');

  try {
    const emotionsData = JSON.parse(fs.readFileSync(emotionsPath, 'utf8'));
    const chunksData = JSON.parse(fs.readFileSync(chunksPath, 'utf8'));

    res.json({
      songlist,             
      emotions: emotionsData,
      chunks: chunksData,
    });
  } catch (err) {
    console.error('Error loading JSON files:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to load data' });
    }
  }
});


module.exports = router;

/*
{ name: "Creep", artist:'Radiohead' , emotion: 'Sad' ,url: "https://ia803205.us.archive.org/1/items/radiohead-creep_202006/Radiohead%20-%20Creep.mp3" },
  { name: "High and Dry", artist:'Radiohead' , emotion: 'Happy', url: "https://ia802302.us.archive.org/21/items/radiohead-high-dry-live-package/01%20-%20High%20%26%20Dry.mp3" }
*/

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
