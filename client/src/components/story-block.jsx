import React, { useState, useEffect } from 'react';
import './story-block.css';

function StoryBlock({ string }) {
  const chapters = Object.keys(string || {});
  const [currentChapter, setCurrentChapter] = useState('');
  const [chunkIndex, setChunkIndex] = useState(0);

  // Set initial chapter when string is available
  useEffect(() => {
    if (chapters.length > 0 && !currentChapter) {
      setCurrentChapter(chapters[0]);
    }
  }, [chapters, currentChapter]);

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

  return (
    <div className="story-block fadeUp">
      <div className="story-controls">
        <select value={currentChapter} onChange={handleChapterChange}>
          {chapters.map((chapter) => (
            <option key={chapter} value={chapter}>{chapter}</option>
          ))}
        </select>
        <div className="nav-buttons">
          <button onClick={handlePrev} disabled={chunkIndex === 0}>Previous</button>
          <button onClick={handleNext} disabled={chunkIndex === chunkKeys.length - 1}>Next</button>
        </div>
      </div>

      <div className="story-textbox">
        {string[currentChapter]?.[chunkKeys[chunkIndex]]}
      </div>
    </div>
  );
}

export default StoryBlock;
