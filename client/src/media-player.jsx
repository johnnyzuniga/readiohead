import { useState } from 'react'
import './media-player.css'

function MediaPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className='fadein-up'>
      <div className="media-player">
        <div className="controls">
          <button className="play-button" onClick={handlePlayPause}>
            {isPlaying ? '⏸' : '▶'}
          </button>
          <div className="progress"></div>
          <button className="play-button">🕪</button>
        </div>
      </div>
    </div>
  );
}


export default MediaPlayer;