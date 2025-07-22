import { useState, useEffect } from 'react'
import spotifyLogo from './assets/spotify.png'
import axios from 'axios' 
import './App.css'

function App() {

    const [array, setArray] = useState([]);

  //API CALL BLOCK
  const fetchAPI = async() => {
    const response = await axios.get('http://localhost:8080/');
    console.log(response.data.message);
    setArray(response.data.fruits);
  }

  useEffect(() => {
    fetchAPI();
  }, []);
  //END API CALL BLOCK

  return (
    <div>
      <img src={spotifyLogo} className='logo spotify entrance-logo' alt="Spotify Logo" />
      <h1 className='title entrance'>Readiohead</h1>
      <h2 className='subtext entrance'>Your paragraphs to emotion</h2>

      {/* API data display */}
      <h3 className='fruits-title'>Fruits from the server:</h3>
      <div className='fruits'>
        {array.map((fruit, index) => (
          <div key={index} className='fruit-item'>
            {fruit}
          </div>
        ))}
      </div>

    </div>
  )
}

export default App
