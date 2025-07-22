import { useState } from 'react'
import './media-player.css'

function MediaPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
      <div className="media-player fadein-up">
        <div className="controls">
          <button className="play-button" onClick={handlePlayPause}>
            {isPlaying ? '⏸' : '▶'}
          </button>
          <div className="progress"></div>
          <button className="play-button">🕪</button>
        </div>
      </div>
  );
}


export default MediaPlayer;