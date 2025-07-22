import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MediaPlayer from './media-player.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <MediaPlayer />
  </StrictMode>,
)
