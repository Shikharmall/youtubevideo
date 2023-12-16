import React, { useState } from "react";
import axios from "axios";
import VideoPlayer from "../components/VideoPlayer";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Home = () => {
  const [videoId, setVideoId] = useState("");
  const [isVideo, setIsVideo] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  const handleInputChange = (e) => {
    setVideoId(e.target.value);
    setIsVideo(false);
  };

  const handleFetchVideo = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${apiKey}`
      );

      const video = response.data.items[0];
      if (video) {
        setVideoId(video.id);
        setIsVideo(true);
      } else {
        console.error("Video not found");
        setIsVideo(true);
      }
    } catch (error) {
      console.error("Error fetching video:", error.message);
      setIsVideo(true);
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

      <p className="mb-4 text-primary">
        By default use this Unlisted Video ID: kUFFEFxs8YU
      </p>

      {(isVideo && videoId) && (
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
