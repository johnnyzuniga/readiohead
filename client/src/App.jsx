import { useState, useEffect } from 'react'
import spotifyLogo from './assets/spotify.png'
import axios from 'axios' 
import './App.css'
import MediaPlayer from './components/media-player.jsx'
import StoryBlock from './components/story-block.jsx'

function App() {

  const [song, setSongs] = useState([]);
  const [emotions, setEmotions] = useState({});   // For chunks_emotions_data.json
  const [chunks, setChunks] = useState({});

  //API CALL BLOCK
  const fetchAPI = async () => {
    const response = await axios.get('http://localhost:8080/');
    const { songlist, emotions, chunks } = response.data;

    setSongs(songlist);
    setEmotions(emotions);
    setChunks(chunks);
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
      {/*START*/}{/*END*/}
      <MediaPlayer queue={song} emotions={emotions}/>
      <StoryBlock string={chunks} />
    </div>
  )
}

export default App
/*
const fetchAPI = async () => {
    const response = await axios.get('http://localhost:8080/');
    setSongs(response.data.songlist);
  };

  useEffect(() => {
    fetchAPI();
  }, []);
*/
/*<div className='fadeUp'> 
        <h3>In Queue</h3>
          <div>
          {song.map((song, index) => (
            <div key={index}>
              {song.name} = {song.emotion}
            </div>
            ))}
          </div>
      </div> */