import React, { useState } from 'react';
import axios from 'axios';
import VideoPlayer from '../components/VideoPlayer';

const Home = () => {
  const [videoId, setVideoId] = useState('');

  const handleInputChange = (e) => {
    setVideoId(e.target.value);
  };

  const handleFetchVideo = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${process.env.YOUTUBE_API_KEY}`
      );

      const video = response.data.items[0];
      if (video) {
        setVideoId(video.id);
      } else {
        console.error('Video not found');
      }
    } catch (error) {
      console.error('Error fetching video:', error.message);
    }
  };

  return (
    <div>
      <h1>YouTube Video Player</h1>
      <div>
        <label>Enter Unlisted Video ID:</label>
        <input type="text" value={videoId} onChange={handleInputChange} />
        <button onClick={handleFetchVideo}>Fetch Video</button>
      </div>

      <p>By default use this id- kUFFEFxs8YU</p>
      {videoId && <VideoPlayer videoId={videoId} />}
    </div>
  );
};

export default Home;
