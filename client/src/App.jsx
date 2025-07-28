import { useState, useEffect } from 'react'
import spotifyLogo from './assets/spotify.png'
import axios from 'axios' 
import './App.css'
import MediaPlayer from './media-player.jsx'
function App() {

    const [array, setArray] = useState([]);

  //API CALL BLOCK
  const fetchAPI = async () => {
    const response = await axios.get('http://localhost:8080/');
    setArray(response.data.songlist); // don't map to song.name — keep full objects
  };

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
      {/*START*/}<div className='fadeUp'> 
        <h3>In Queue</h3>
          <div>
          {array.map((song, index) => (
            <div key={index}>
              {song.name}
            </div>
            ))}
          </div>
      </div>{/*END*/}
      <MediaPlayer queue={array}/>
    </div>
  )
}

export default App
