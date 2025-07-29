import React, { useState, useEffect } from 'react';
import './story-block.css';

function StoryBlock({ string, queue, emotions, onSongSelect }) {
  const chapters = Object.keys(string || {});
  const [currentChapter, setCurrentChapter] = useState('');
  const [chunkIndex, setChunkIndex] = useState(0);
  const [selectedSongUrl, setSelectedSongUrl] = useState('');
  const [currentEmotion, setEmotion] = useState('');

  const chunkKeys = Object.keys(string[currentChapter] || {});
  const currentChunkKey = chunkKeys[chunkIndex];

  const selectedSong = queue?.find(song => song.url === selectedSongUrl);
  const songEmotion = selectedSong?.emotion;

  // Set initial chapter
  useEffect(() => {
    if (chapters.length > 0 && !currentChapter) {
      setCurrentChapter(chapters[0]);
    }
  }, [chapters, currentChapter]);

  // Sync emotion + song whenever chunk changes
  useEffect(() => {
    if (!currentChapter || !queue || !emotions) return;

    const chunkKey = Object.keys(string[currentChapter] || {})[chunkIndex];
    const label = emotions?.[currentChapter]?.[chunkKey]?.[0]?.label;

    if (label) {
      setEmotion(label);

      const matchingSong = queue.find(song =>
        song.emotion.toLowerCase() === label.toLowerCase()
      );

      if (matchingSong) {
        setSelectedSongUrl(matchingSong.url);
      } else if (queue.length > 0) {
        setSelectedSongUrl(queue[0].url); // fallback
      }
    }
  }, [chunkIndex, currentChapter, emotions, queue, string]);

  // Notify parent of song selection
  useEffect(() => {
    if (selectedSongUrl) {
      onSongSelect(selectedSongUrl);
    }
  }, [selectedSongUrl, onSongSelect]);

  const handleChapterChange = (e) => {
    setCurrentChapter(e.target.value);
    setChunkIndex(0); // reset to first chunk
  };

  const getChunkEmotions = () => {
    if (!emotions?.[currentChapter]) return [];
    return chunkKeys.map((chunkKey, index) => ({
      index,
      chunkKey,
      emotion: emotions[currentChapter][chunkKey]?.[0]?.label
    })).filter(item => item.emotion);
  };

  const handlePrev = () => {
    const chunkEmotions = getChunkEmotions();
    const currentEmotionIndex = chunkEmotions.findIndex(item => item.index === chunkIndex);

    if (currentEmotionIndex > 0) {
      const prevChunk = chunkEmotions[currentEmotionIndex - 1];
      setChunkIndex(prevChunk.index);
    }
  };

  const handleNext = () => {
    const chunkEmotions = getChunkEmotions();
    const currentEmotionIndex = chunkEmotions.findIndex(item => item.index === chunkIndex);

    if (currentEmotionIndex < chunkEmotions.length - 1 && currentEmotionIndex !== -1) {
      const nextChunk = chunkEmotions[currentEmotionIndex + 1];
      setChunkIndex(nextChunk.index);
    }
  };

  const handleSongSelect = (e) => {
    setSelectedSongUrl(e.target.value);
  };

  const emotionsMatch = () => {
    if (!currentEmotion || !songEmotion) return false;
    return currentEmotion.toLowerCase() === songEmotion.toLowerCase();
  };

  return (
    <div className="story-block fadeUp">
      <div className="story-controls">
        <div className="control-group">
          <label>Chapter: </label>
          <select value={currentChapter} onChange={handleChapterChange}>
            {chapters.map((chapter) => (
              <option key={chapter} value={chapter}>{chapter}</option>
            ))}
          </select>
        </div>

        <div className="nav-buttons">
          <button
            onClick={handlePrev}
            disabled={getChunkEmotions().findIndex(item => item.index === chunkIndex) === 0}
          >
            ◀ Prev
          </button>
          <button
            onClick={handleNext}
            disabled={getChunkEmotions().findIndex(item => item.index === chunkIndex) >= getChunkEmotions().length - 1}
          >
            Next ▶
          </button>
        </div>

        <div className="control-group">
          <label>Music: </label>
          <select value={selectedSongUrl} onChange={handleSongSelect}>
            {queue?.map(song => (
              <option key={song.url} value={song.url}>
                {/*Sentence Cased Emotion*/}
                {song.emotion.charAt(0).toUpperCase() + song.emotion.slice(1).toLowerCase()} - {song.name}
              </option>
            ))}
          </select>
        </div>

        {/* Debug info */}
        {/*
        <div className="emotion-debug" style={{marginTop: '10px', fontSize: '0.8em', color: '#666'}}>
          <div>Story Emotion: <strong>{currentEmotion || 'None'}</strong></div>
          <div>Song Emotion: <strong>{songEmotion || 'None'}</strong></div>
          <div>Match: <strong style={{color: emotionsMatch() ? 'green' : 'red'}}>
            {emotionsMatch() ? '✅ Yes' : '❌ No'}
          </strong></div>
          <div>Current Chunk: {currentChunkKey}</div>
        </div>
        */}

      </div>

      <div className="story-textbox">
        {string[currentChapter]?.[chunkKeys[chunkIndex]]}
      </div>
    </div>
  );
}

export default StoryBlock;
