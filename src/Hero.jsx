import { useState } from 'react'
import spotifyLogo from './assets/spotify.png'
import './Hero.css'

function App() {
  
  return (
    <div>
      <img src={spotifyLogo} className='logo spotify entrance-logo' alt="Spotify Logo" />
      <h1 className='title entrance'>Readiohead</h1>
      <h2 className='subtext entrance'>Your paragraphs to emotion</h2>
    </div>
  )
}

export default App
