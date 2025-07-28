require('dotenv').config();
const express = require('express');
const app = express();
const SpotifyWebApi = require('spotify-web-api-node')
const cors = require('cors');
const corsOptions = {
  origin: ['http://localhost:5173'], 
};
const router = require('./routes/route');

app.use(express.json());
app.use(cors(corsOptions));
app.use('/', router);

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
    app.locals.spotifyApi = spotifyApi; // Make it available to routes
  })
  .catch(error => {
    console.log("Something went wrong when retrieving an access token", error);
});

// After setting access token

//SPOTIFY API -- END

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`);
});