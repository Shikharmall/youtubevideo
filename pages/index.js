import React, { useState } from 'react';
import axios from 'axios';
import VideoPlayer from '../components/VideoPlayer';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';

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
    <Container className="mt-5">
      <h1 className="mb-4">YouTube Video Player</h1>

      <Row className="mb-3">
            <Form.Label>Enter Unlisted Video ID:</Form.Label>
        <Col>
          <Form.Group>
            <Form.Control
              type="text"
              value={videoId}
              onChange={handleInputChange}
              placeholder="Enter Video ID"
            />
          </Form.Group>
        </Col>
        <Col>
          <Button variant="primary" onClick={handleFetchVideo}>
            Fetch Video
          </Button>
        </Col>
      </Row>

      <p className="mb-4 text-primary">By default use this Unlisted Video ID: kUFFEFxs8YU</p>

      {videoId && (
        <Row>
          <Col>
            <VideoPlayer videoId={videoId} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Home;
