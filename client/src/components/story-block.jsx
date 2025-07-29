import React, { useState, useEffect } from 'react';
import './story-block.css';

function StoryBlock({ string, queue, onSongSelect }) {
  const chapters = Object.keys(string || {});
  const [currentChapter, setCurrentChapter] = useState('');
  const [chunkIndex, setChunkIndex] = useState(0);
  const [selectedSongUrl, setSelectedSongUrl] = useState('');

  useEffect(() => {
    if (chapters.length > 0 && !currentChapter) {
      setCurrentChapter(chapters[0]);
    }
  }, [chapters, currentChapter]);

  useEffect(() => {
    if (queue && queue[chunkIndex]) {
      setSelectedSongUrl(queue[chunkIndex].url);
    }
  }, [chunkIndex, queue]);

  useEffect(() => {
    if (selectedSongUrl) {
      onSongSelect(selectedSongUrl);
    }
  }, [selectedSongUrl, onSongSelect]);

  const chunkKeys = Object.keys(string[currentChapter] || {});

  const handleChapterChange = (e) => {
    setCurrentChapter(e.target.value);
    setChunkIndex(0);
  };

  const handlePrev = () => {
    if (chunkIndex > 0) setChunkIndex(chunkIndex - 1);
  };

  const handleNext = () => {
    if (chunkIndex < chunkKeys.length - 1) setChunkIndex(chunkIndex + 1);
  };

  const handleSongSelect = (e) => {
    setSelectedSongUrl(e.target.value);
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
          <button onClick={handlePrev} disabled={chunkIndex === 0}>◀ Prev</button>
          <button onClick={handleNext} disabled={chunkIndex === chunkKeys.length - 1}>Next ▶</button>
        </div>

        <div className="control-group">
          <label>Music: </label>
          <select value={selectedSongUrl} onChange={handleSongSelect}>
            {queue.map(song => (
              <option key={song.url} value={song.url}>
                {song.emotion}: {song.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="story-textbox">
        {string[currentChapter]?.[chunkKeys[chunkIndex]]}
      </div>
    </div>
  );
}

export default StoryBlock;
