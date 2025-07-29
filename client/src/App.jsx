import { useState, useEffect } from 'react';
import spotifyLogo from './assets/spotify.png';
import axios from 'axios';
import './App.css';
import MediaPlayer from './components/media-player.jsx';
import StoryBlock from './components/story-block.jsx';

function App() {
  const [song, setSongs] = useState([]);
  const [emotions, setEmotions] = useState({});
  const [chunks, setChunks] = useState({});
  const [currentSongUrl, setCurrentSongUrl] = useState(null);

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

  useEffect(() => {
    if (song.length > 0 && !currentSongUrl) {
      setCurrentSongUrl(song[0].url);
    }
  }, [song]);

  return (
    <div>
      <img src={spotifyLogo} className='logo spotify fadeDown' alt="Spotify Logo" />
      <h1 className='title fadeUp'>Readiohead</h1>
      <h2 className='subtext fadeUp'>Your paragraphs to emotion</h2>

      <MediaPlayer 
        queue={song} 
        emotions={emotions} 
        currentSongUrl={currentSongUrl}
        onSongChange={setCurrentSongUrl}
      />
      <StoryBlock 
        string={chunks} 
        queue={song} 
        onSongSelect={setCurrentSongUrl}
      />
    </div>
  );
}

export default App;
