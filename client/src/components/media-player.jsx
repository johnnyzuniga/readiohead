import { useEffect } from 'react';
import { useRef, useState } from 'react';
import './media-player.css'; 

function MediaPlayer({ queue, emotions }) {
  const audioRef = useRef(null);
  const [mood, setMood] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [audioSource, setAudioSource] = useState(null);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const currentSong = queue?.find(song => song.url === audioSource);

  useEffect(() => {
  if (queue && queue.length > 0) {
    //CHANGE SONG HERE
    const songUrl = queue[0].url;
    setAudioSource(songUrl);
    if (audioRef.current) {
      audioRef.current.src = songUrl;
      audioRef.current.load();
      audioRef.current.volume = volume;
    }
  } else {
    setError('No songs in queue');
  }
}, [queue]);


  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      setIsLoading(false);
      setError(null);
    };

    const handleError = (e) => {
      console.error('Audio error:', e);
      setError('Error loading audio file');
      setIsLoading(false);
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handleTimeUpdate = () => {
      if (!isDragging) {
        setCurrentTime(audio.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [audioSource]);
  //END API CALL BLOCK

  const handlePlayPause = async () => {
    if (!audioRef.current || !audioSource) {
      console.warn('Audio not ready');
      return;
    }

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Check if audio is ready to play
        if (audioRef.current.readyState >= 2) { // HAVE_CURRENT_DATA or higher
          await audioRef.current.play();
          setIsPlaying(true);
        } else {
          console.warn('Audio not loaded yet');
          setError('Audio is still loading...');
        }
      }
    } catch (err) {
      console.error('Play/pause error:', err);
      setError('Playback failed');
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleVolumeSlider = () => {
    setShowVolumeSlider(!showVolumeSlider);
  };

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleProgressMouseDown = () => {
    setIsDragging(true);
  };

  const handleProgressMouseUp = () => {
    setIsDragging(false);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="media-player fadeIn">
      <audio ref={audioRef} preload="auto" />
      <div className="controls">
        <button 
          className="play-button" 
          onClick={handlePlayPause}
          disabled={isLoading || !audioSource}
        >
          {isLoading ? '⏳' : (isPlaying ? '⏸' : '▶')}
        </button>
        <div className="progress-container">
          <span className="time-display">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleProgressChange}
            onMouseDown={handleProgressMouseDown}
            onMouseUp={handleProgressMouseUp}
            onTouchStart={handleProgressMouseDown}
            onTouchEnd={handleProgressMouseUp}
            className="progress-bar"
            disabled={!duration}
          />
          <span className="time-display">{formatTime(duration)}</span>
        </div>
        <div className="volume-control">
          <button className="play-button" onClick={toggleVolumeSlider}>🕪</button>
          {showVolumeSlider && (
            <div className="volume-slider-container">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className={"volume-slider"}
              />
            </div>
          )}
        </div>
      </div>
      {currentSong && (
        <><div className="now-playing">{currentSong.artist} - {currentSong.name}</div></>
        )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default MediaPlayer;