import { useState, useEffect } from 'react'
import spotifyLogo from './assets/spotify.png'
import axios from 'axios' 
import './App.css'

function App() {

    const [array, setArray] = useState([]);

  //API CALL BLOCK
  const fetchAPI = async() => {
    const response = await axios.get('http://localhost:8080/');
    setArray(response.data.songlist.map(song => song.name)); // Set the song names in the array
  }

  useEffect(() => {
    fetchAPI();
  }, []);
  //END API CALL BLOCK
  
  return (
    <div>
      <img src={spotifyLogo} className='logo spotify fadeDown' alt="Spotify Logo" />
      <h1 className='title fadeUp'>Readiohead</h1>
      <h2 className='subtext fadeUp'>Your paragraphs to emotion</h2>

      {/* API data display */}
      <div className='fadeUp'>
        <h3>In Queue</h3>
          <div>
          {array.map((song, index) => (
            <div key={index}>
              {song}
            </div>
            ))}
          </div>
      </div>
    </div>
  )
}

export default App
