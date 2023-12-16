import React from 'react';
import YouTube from 'react-youtube';
import { Card } from 'react-bootstrap'; // Make sure to adjust the path based on your project structure

const VideoPlayer = ({ videoId }) => {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <YouTube videoId={videoId} opts={opts} />
      </Card.Body>
    </Card>
  );
};

export default VideoPlayer;

